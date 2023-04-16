import React from "react";
import { SealedSearchResult, useStore } from "~/store";

type Props = {
  product: SealedSearchResult;
};

export default function SealedCatalogRow({ product }: Props) {
  const { websites } = useStore();
  return (
    <div className="m-1 grid grid-cols-12 gap-4 rounded-md bg-zinc-900 p-2 hover:bg-zinc-700">
      <div className="col-span-3 m-auto">
        <img
          src={product.image}
          alt={product.name}
          className="h-20 rounded-md md:h-24"
        />
      </div>
      <div className="col-span-5 mt-2 text-left">
        <div className="flex flex-col">
          <div className="text-md font-bold">{product.name}</div>
          <div className="text-sm dark:text-gray-400 ">{product.language}</div>
          <div className="flex flex-row">
            {/* for each tag in product.tag, create a little tag card with a gradient background */}
            {product.tags.map((tag: string) => (
              <div
                key={tag}
                className="mr-1 mt-1 rounded-md px-2 py-1 text-xs font-bold text-white"
                style={{
                  background: `linear-gradient(90deg, red 0%, purple 100%)`,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-4 mt-2">
        <div className="flex flex-col items-end">
          <div className="text-lg font-bold">{product.price}</div>
          {/* if product.stock >= 1, show the stock, otherwise show a green checkmark */}
          <div className="text-xs font-bold">
            In stock: {product.stock >= 1 ? product.stock : "✓"}
          </div>
          <img
            //   find website with website.code === product.website
            src={
              websites.find(
                (website) =>
                  website.code.toLowerCase() === product.website.toLowerCase()
              )?.image
            }
            alt={product.website}
            className="mt-1 w-12 object-cover md:w-12"
          />

          <button
            className="focus:shadow-outline mt-4 rounded bg-zinc-800 p-1 px-2 font-bold text-white transition-all hover:bg-zinc-900 focus:outline-none sm:px-4 sm:py-1 "
            onClick={() => window.open(product.link, "_blank")}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
