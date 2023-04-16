import React from "react";
import { useStore } from "~/store";

export default function MultiSearchResultsInfo() {
  const {
    filteredMultiSearchResults: results,
    selectAllMultiSearchResults,
    resetMultiSearch,
    missingMultiSearchResults: missingCards,
    multiSearchSelectedCost,
  } = useStore();
  return (
    <div className="w-full rounded-sm bg-zinc-900">
      <div className="flex h-full flex-col items-center justify-center p-4">
        {/* Missing Cards */}
        {missingCards.length > 0 && (
          <div className="w-full justify-center">
            <div className="mx-auto mb-2 flex max-w-sm flex-col space-y-1 rounded-md bg-zinc-800 p-3">
              <div className="text-center">No results found for</div>

              {missingCards.map((card, index) => (
                <div key={index} className="">
                  <div>{card}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mb-4 flex justify-center">
          <button
            className="focus:shadow-outline mx-auto mt-4 rounded px-2 py-1 text-sm font-bold outline outline-2 -outline-offset-2 outline-pink-500 transition-all hover:bg-pink-500 hover:bg-opacity-50 focus:outline-pink-900"
            type="button"
            onClick={resetMultiSearch}
          >
            Search again
          </button>
          <div className="p-4"></div>

          <button
            className="focus:shadow-outline mx-auto mt-4 rounded bg-pink-600 px-2 py-1 text-sm font-bold text-white transition-all hover:bg-pink-700 focus:outline-pink-900"
            type="button"
            onClick={selectAllMultiSearchResults}
            //   onClick={() => handleSelectAll()}
          >
            Select All
          </button>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2">
          {/* Total cost of selected cards */}
          <div className=" text-xl font-bold">
            ${multiSearchSelectedCost.toFixed(2)}
            {" - "}
          </div>
          {/* Num Selected Cards */}
          <div className="">
            {results.filter((card) => card.selected === true).length} of{" "}
            {results.length} cards selected
          </div>
        </div>
      </div>
    </div>
  );
}
