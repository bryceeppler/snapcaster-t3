import { type MultiSearchCardState } from "~/store";
import React from "react";
import { useStore } from "~/store";
import CloseButton from "./CloseButton";

type Props = {
  card: MultiSearchCardState;
};

export default function CardVariantSelector({ card }: Props) {
  // Basic modal that displays all of card.variants and allows us to update the selectedVariant in the zustand store
  const [modalOpen, setModalOpen] = React.useState(false);
  const { updateSelectedVariant, sortMultiSearchVariants: sortVariants } =
    useStore();
  // const fetchWebsiteName = (websiteCode) => {
  //   let website = store.websiteCodeMap.find(
  //     (website) => website.code === websiteCode.toLowerCase()
  //   );
  //   if (website) {
  //     return website.name;
  //   } else {
  //     return websiteCode;
  //   }
  // };

  return (
    <div>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className="m-2 w-full rounded-md bg-pink-500 p-2 text-sm text-white transition-all hover:bg-pink-800"
      >
        Other results
      </button>
      {modalOpen && (
        <div
          className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-zinc-800 bg-opacity-60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setModalOpen(false);
            }
          }}
        >
          <div
            className="mx-1 rounded-md border-2 border-pink-500 bg-zinc-800 px-2 pt-4 md:w-1/2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className="flex flex-row justify-between
          "
            >
              {/* selector to choose what to sort by */}
              <div
                className="
              mx-4 flex flex-row
              items-center
            "
              >
                <div className="font-md font-bold ">Sort by:</div>
                <select
                  className="m-2 rounded-md bg-black p-2"
                  onChange={(e) => {
                    sortVariants(card, e.target.value);
                  }}
                >
                  <option value="price">Price</option>
                  <option value="condition">Condition</option>
                  <option value="website">Website</option>
                </select>
              </div>
              {/* Close button */}
              <div>
                <CloseButton onClick={() => setModalOpen(false)} />
              </div>
            </div>

            {/* Scrollable */}
            <div className="m-2 mb-4 max-h-96 overflow-y-scroll">
              <div className="grid grid-cols-1">
                {card.variants.map((variant, index) => {
                  return (
                    <div
                      key={index}
                      className="m-2 flex flex-row rounded bg-zinc-800 p-2 hover:bg-zinc-900"
                      onClick={() => {
                        // store.updateSelectedVariant(card, variant);
                        updateSelectedVariant(card.cardName, variant);
                        setModalOpen(false);
                      }}
                    >
                      <img
                        src={variant.image}
                        alt={variant.name}
                        className="w-24 rounded-md"
                      />
                      {/* <div className="font-bold text-lg">{variant.name}</div> */}
                      <div className="ml-4 mt-2">
                        <div className="">
                          <div className="text-sm">{variant.set}</div>
                          <div className="my-1 flex flex-row space-x-4 text-left">
                            <div className="text-lg font-bold">
                              ${variant.price}
                            </div>
                            <div className="text-lg">{variant.condition}</div>
                            {variant.foil && (
                              <div
                                // put content centered vertically and horizontally
                                className="flex items-center justify-center rounded-xl bg-gradient-to-tr from-pink-600 to-purple-500 px-2"
                              >
                                <div className="text-sm tracking-wide">
                                  Foil
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="opacity-70">{variant.website}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
