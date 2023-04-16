import { useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import Button from "~/components/ui/Button";
import { postData } from "~/utils/helpers";
import { getStripe } from "~/utils/stripe-client";
import { useUser } from "~/utils/useUser";

import { Price, ProductWithPrice } from "types";

interface Props {
  products: ProductWithPrice[];
}

type BillingInterval = "year" | "month";

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 183 183"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="91.5"
      cy="91.5"
      r="81.5"
      fill="url(#paint0_radial_14_4)"
      stroke="#ED64A6"
      strokeWidth="20"
    />
    <defs>
      <radialGradient
        id="paint0_radial_14_4"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(91.5 91.5) rotate(90) scale(91.5)"
      >
        <stop stopColor="#EA80B8" />
        <stop offset="1" stopColor="#CC629A" />
      </radialGradient>
    </defs>
  </svg>
);

const DisabledCheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 183 183"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="91.5"
      cy="91.5"
      r="81.5"
      fill="url(#paint0_radial_14_5)"
      stroke="#3F3F46"
      strokeWidth="20"
    />
    <defs>
      <radialGradient
        id="paint0_radial_14_5"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(91.5 91.5) rotate(90) scale(91.5)"
      >
        <stop stopColor="#5A5A5A" />
        <stop offset="1" stop-opacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export default function Pricing({ products }: Props) {
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const { user, isLoading, subscription } = useUser();
  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push("/signin");
    }
    if (subscription) {
      return router.push("/account");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };
  console.log(products[1]);

  if (!products.length)
    return (
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col"></div>
          <p className="text-6xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{" "}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );

  return (
    <section className="bg-black">
      <div className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            snapcaster memberships
          </h1>
          <p className="m-auto mt-5 max-w-2xl text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Explore price history charts and search for sealed products.
          </p>
          <div className="w-sm mx-auto mt-5 w-full max-w-sm rounded-md bg-pink-700 bg-opacity-50 p-2">
            Right now all features are in testing, and nothing is locked. There
            is no advantage to paying for a membership.
          </div>
          <div className="relative mt-6 flex self-center rounded-lg border border-zinc-800 bg-zinc-900 p-0.5 sm:mt-8">
            <button
              onClick={() => setBillingInterval("month")}
              type="button"
              className={`${
                billingInterval === "month"
                  ? "relative w-1/2 border-zinc-800 bg-zinc-700 text-white shadow-sm"
                  : "relative ml-0.5 w-1/2 border border-transparent text-zinc-400"
              } m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 sm:w-auto sm:px-8`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingInterval("year")}
              type="button"
              className={`${
                billingInterval === "year"
                  ? "relative w-1/2 border-zinc-800 bg-zinc-700 text-white shadow-sm"
                  : "relative ml-0.5 w-1/2 border border-transparent text-zinc-400"
              } m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 sm:w-auto sm:px-8`}
            >
              Yearly billing
            </button>
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);
            return (
              <div
                key={product.id}
                className={cn(
                  "divide-y divide-zinc-600 rounded-lg bg-zinc-900 shadow-sm",
                  {
                    "border border-pink-500": subscription
                      ? product.name === subscription?.prices?.products?.name
                      : product.name === "Freelancer",
                  }
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-white">
                    {product.name}
                  </h2>
                  <p className="mt-4 text-zinc-300">{product.description}</p>
                  {product.name === "Goblin" ? (
                    <ul className="mt-8">
                      <li className="my-2 flex items-center">
                        <div className="flex-shrink-0">
                          <CheckIcon />
                        </div>
                        <p className="ml-3 text-base text-zinc-300">
                          Sealed search
                        </p>
                      </li>
                      <li className="my-2 flex items-center">
                        <div className="flex-shrink-0">
                          <CheckIcon />
                        </div>
                        <p className="ml-3 text-base text-zinc-300">
                          Price history
                        </p>
                      </li>
                      <li className="my-2 flex items-center">
                        <div className="flex-shrink-0">
                          <CheckIcon />
                        </div>
                        <p className="ml-3 text-base text-zinc-300">No Ads</p>
                      </li>
                    </ul>
                  ) : (
                    <ul className="mt-8">
                      <li className="my-2 flex items-center">
                        <div className="flex-shrink-0">
                          <CheckIcon />
                        </div>
                        <p className="ml-3 text-base text-zinc-300">
                          Upcoming features
                        </p>
                      </li>
                      <li className="my-2 flex items-center">
                        <div className="flex-shrink-0">
                          <CheckIcon />
                        </div>
                        <p className="ml-3 text-base text-zinc-300">
                          Sealed search
                        </p>
                      </li>
                      <li className="my-2 flex items-center">
                        <div className="flex-shrink-0">
                          <CheckIcon />
                        </div>
                        <p className="ml-3 text-base text-zinc-300">
                          Price history
                        </p>
                      </li>
                      <li className="my-2 flex items-center">
                        <div className="flex-shrink-0">
                          <CheckIcon />
                        </div>
                        <p className="ml-3 text-base text-zinc-300">No Ads</p>
                      </li>
                    </ul>
                  )}
                  <p className="mt-8">
                    <span className="white text-5xl font-extrabold">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-zinc-100">
                      /{billingInterval}
                    </span>
                  </p>
                  <Button
                    variant="slim"
                    type="button"
                    disabled={isLoading}
                    loading={priceIdLoading === price.id}
                    onClick={() => handleCheckout(price)}
                    className="mt-8 block w-full rounded-md py-2 text-center text-sm font-semibold text-white hover:bg-zinc-900"
                  >
                    {product.name === subscription?.prices?.products?.name
                      ? "Manage"
                      : "Subscribe"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
