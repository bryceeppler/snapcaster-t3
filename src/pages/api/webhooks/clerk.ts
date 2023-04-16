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

const webhookSecret: string = env.CLERK_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  console.log("received webhook, verifying...");
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
      await prisma.users.upsert({
        where: { clerkId: String(id) },
        update: {
          first_name: String(attributes.first_name),
          last_name: String(attributes.last_name),
          email: "",
        },
        create: {
          clerkId: String(id),
          first_name: String(attributes.first_name),
          last_name: String(attributes.last_name),
          username: String(attributes.username),
          email: "",
          // email: String(attributes.email_addresses?[0].email_address? || ""),
          // ...attributes,
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
