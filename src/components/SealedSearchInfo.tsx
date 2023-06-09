import React from "react";
import { useStore } from "~/store";

export default function SealedSearchInfo() {
  const {
    filteredSealedSearchResults: results,
    sealedSearchQuery,
    sealedSearchResults: resultsRaw,
  } = useStore();
  return (
    <div className="flex w-full flex-col items-center justify-center p-2">
      {resultsRaw.length != results.length ? (
        <p className="text-sm ">
          Displaying {results.length} of {resultsRaw.length} results for &quot;
          {sealedSearchQuery}&quot;
        </p>
      ) : (
        <p className="text-sm ">
          {results.length} results for &quot;{sealedSearchQuery}&quot;
        </p>
      )}
    </div>
  );
}
