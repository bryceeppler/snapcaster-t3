import { useEffect, useState } from "react";
import axios from "axios";
import LoadingDots from "./ui/LoadingDots";

type Props = {
  popularSealed: SealedProductInfo[];
};

export type SealedProductInfo = {
  name: string;
  count: number;
  product_name: string;
  product_image: string;
  product_price: number | null;
};

export default function PopularSealed({ popularSealed }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   // Remove duplicates
  //   popularSealed = popularSealed.filter(
  //     (card, index, self) =>
  //       index === self.findIndex((t) => t.name === card.name)
  //   );
  //   console.log(popularSealed)
  // }, []);

  const nextSealedProduct = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % popularSealed.length);
  };

  const prevSealedProduct = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + popularSealed.length) % popularSealed.length
    );
  };

  const getSealedProductIndex = (offset: number) => {
    const newIndex = activeIndex + offset;
    return newIndex >= 0
      ? newIndex % popularSealed.length
      : popularSealed.length + newIndex;
  };

  const visibleSealed = [
    popularSealed[getSealedProductIndex(-1)],
    popularSealed[getSealedProductIndex(0)],
    popularSealed[getSealedProductIndex(1)],
  ];

  return (
    <div className="border-1 mx-auto mt-6 w-full max-w-3xl rounded-md border border-zinc-600 p-4 backdrop-blur-md backdrop-brightness-75 ">
      {" "}
      <h2 className="mb-4 text-center text-2xl font-bold">Popular searches</h2>
      {popularSealed.length > 0 ? (
        <div className="flex items-center justify-center">
          <button
            className="rounded-r bg-white bg-opacity-75 p-2"
            onClick={prevSealedProduct}
          >
            &lt;
          </button>
          {visibleSealed.map(
            (product, index) =>
              product && (
                <div
                  key={index}
                  className={`mx-2 flex flex-col items-center sm:w-1/3 ${
                    //  if small or below, hide all but index 0
                    index === 0 ? "block" : "hidden sm:block"
                  }`}
                >
                  <div className="flex h-48 w-full items-center">
                    <img
                      className="mx-auto max-h-full max-w-full object-contain"
                      src={product.product_image}
                      alt={product.product_name}
                    />
                  </div>
                  <p className="mt-2 w-36 truncate text-center text-sm">
                    {product.product_name}
                  </p>
                  <p className="text-center font-mono text-sm text-pink-300">
                    {product.product_price
                      ? `$${product.product_price.toFixed(2)}`
                      : "Price not available"}
                  </p>
                </div>
              )
          )}
          <button
            className="rounded-l bg-white bg-opacity-75 p-2"
            onClick={nextSealedProduct}
          >
            &gt;
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center pt-5">
          <LoadingDots />
        </div>
      )}
    </div>
  );
}
