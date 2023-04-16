import { type IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook, type WebhookRequiredHeaders } from "svix";
import { buffer } from "micro";
import { prisma } from "~/server/db";
import { env } from "~/env.mjs";

// Disable the bodyParser so we can access the raw
// request body for verification.
export const config = {
  api: {
    bodyParser: false,
  },
};
type EmailAddress = {
  email_address: string;
  id: string;
  object: string;
  verification: Verification;
};

type Verification = {
  status: string;
  strategy: string;
};
type ClerkUser = {
  created_at: number;
  email_addresses: EmailAddress[];
  first_name: string;
  last_name: string;
  last_sign_in_at: number;
  phone_numbers: string[];
  primary_email_address_id: string;
  primary_phone_number_id: null | string;
  profile_image_url: string;
  updated_at: number;
  username: null | string;
};

const webhookSecret: string = env.CLERK_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  // Verify the webhook signature
  // See https://docs.svix.com/receiving/verifying-payloads/how
  const payload = (await buffer(req)).toString();
  const headers = req.headers;
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payload, headers) as Event;
  } catch (_) {
    console.log("Could not verify webhook signature.");
    return res.status(400).json({});
  }

  // Handle the webhook
  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, ...attributes } = evt.data;
    // update or create the user in the database

    try {
      const clerkUser: ClerkUser = attributes as unknown as ClerkUser;

      // find the primary email address
      const primaryEmailAddress = clerkUser.email_addresses.find(
        (emailAddress) => emailAddress.id === clerkUser.primary_email_address_id
      );
      const email = primaryEmailAddress?.email_address || "";
      await prisma.users.upsert({
        where: { clerkId: String(id) },
        update: {
          first_name: String(attributes.first_name),
          last_name: String(attributes.last_name),
          email: email,
          profileImageUrl: String(attributes.profile_image_url),
        },
        create: {
          clerkId: String(id),
          first_name: String(attributes.first_name),
          last_name: String(attributes.last_name),
          username: String(attributes.username),
          email: email,
          profileImageUrl: String(attributes.profile_image_url),
        },
      });
    } catch (e) {
      console.log("Error upserting user", e);
    }

    console.log("User", id, "was updated in the database.");
  } else {
    console.log("Unhandled event type", eventType);
  }

  res.json({});
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

// Generic (and naive) way for the Clerk event
// payload type.
type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "user.updated" | "*";
