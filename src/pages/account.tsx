import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Button from "~/components/ui/Button/Button";
import { api } from "~/utils/api";
import Input from "~/components/ui/Input/Input";

type CardProps = {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
};

function Card({ title, description, footer, children }: CardProps) {
  console.log(children);
  return (
    <div className="p m-auto	my-8 w-full max-w-3xl rounded-md border border-zinc-700 backdrop-blur backdrop-brightness-75">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-2xl font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="rounded-b-md border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500">
        {footer}
      </div>
    </div>
  );
}

export default function Account() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { data: userData, isLoading: userDataLoading } =
    api.users.getAccountPage.useQuery({
      clerkId: user?.id ?? "",
    });

  console.log(userData);
  return (
    <div className="mx-auto min-h-screen w-full max-w-4xl px-4 pb-8 pt-8 sm:px-6 sm:pt-12 lg:px-8">
      <div className=" sm:flex sm:flex-col">
        <h1 className="text-4xl font-extrabold text-white sm:text-4xl">
          Account Settings
        </h1>

        <Card
          title="Plan"
          description="Your account is on the free plan."
          footer={
            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between">
              <p>Manage your subscription on Stripe.</p>
              <Button
                variant="slim"
                loading={false}
                disabled={false}
                onClick={() => {
                  console.log("Open Stripe");
                }}
              >
                Open Stripe
              </Button>
            </div>
          }
        >
          {}
        </Card>
        <Card
          title="Email"
          description="Change your email that will be used for email notifications."
          footer={
            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between">
              <p>We will email you to verify the change.</p>
              {/* <div className="rounded bg-slate-600 p-2">Save</div> */}
              <Button
                variant="slim"
                loading={false}
                disabled={false}
                onClick={() => {
                  console.log("Save");
                }}
              >
                Save
              </Button>
            </div>
          }
        >
          <input
            type="text"
            className="mt-3 block w-full rounded-md border border-zinc-300 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
            placeholder="Email"
          />

          <div className="flex flex-row items-center justify-center">
            <label htmlFor="enabled-email-notifications" className="mt-4">
              Enable email notifications
            </label>
            <input
              type="checkbox"
              id="enabled-email-notifications"
              className="w-6"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
