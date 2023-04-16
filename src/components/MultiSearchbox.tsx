import React from "react";
import { useStore } from "~/store";

const parseMultiSearchInput = (input: string) => {
  const lines = input.split(/\n/);

  let returnString = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // if the line is empty, skip it
    if (line !== "" && line !== undefined) {
      // remove any numbers from the start of the line
      const lineWithoutCount = line.replace(/^\d+/, "");
      // remove any whitespace from the start of the line
      const lineWithoutCountAndWhitespace = lineWithoutCount.replace(
        /^\s+/,
        ""
      );
      // remove any whitespace from the end of the line
      const lineWithoutCountAndWhitespaceAndTrailingWhitespace =
        lineWithoutCountAndWhitespace.replace(/\s+$/, "");
      // add the line to the return string
      // if the length > 0, add to the return string
      if (lineWithoutCountAndWhitespaceAndTrailingWhitespace.length > 0) {
        returnString +=
          lineWithoutCountAndWhitespaceAndTrailingWhitespace + "\n";
      }
    }
  }

  return returnString;
  // const result = lines.map((line) => {
  //   // if the line is empty, return null
  //   if (line === '') return null
  //   // if the line is a number, return null
  //   if (!isNaN(parseInt(line))) return null
  //   // remove any numbers from the start of the line
  //   const lineWithoutCount = line.replace(/^\d+/, '')
  //   // remove any whitespace from the start of the line
  //   const lineWithoutCountAndWhitespace = lineWithoutCount.replace(/^\s+/, '')
  //   // remove any whitespace from the end of the line
  //   const lineWithoutCountAndWhitespaceAndTrailingWhitespace = lineWithoutCountAndWhitespace.replace(/\s+$/, '')
  //   // return the line
  //   return lineWithoutCountAndWhitespaceAndTrailingWhitespace
  // })
  // // filter out any null values
  // result.filter((line) => line !== null)
  // // join the lines with a newline
  // console.log(result.join('\n')
};

export default function MultiSearchbox() {
  const {
    multiSearchQuery,
    multiSearchInput,
    setMultiSearchInput,
    fetchMultiSearchResults,
  } = useStore();
  return (
    <div className="mb-4 flex w-full flex-col justify-center">
      <div className="mt-3 w-full">
        {/* <label
          htmlFor="multisearchFormControlTextarea1"
          className="text-3xl font-extrabold form-label inline-block mb-2 "
        >
          Cards
        </label> */}
        <div className="mb-2 text-sm text-gray-400">
          Enter card names, one per line (max 100 lines)
        </div>
        <textarea
          className="
          form-control
          m-0
          block
          w-full
          rounded
          border
          border-solid
          border-zinc-300 bg-zinc-900
          bg-clip-padding px-3 py-1.5
          text-base
          font-normal
          transition
          ease-in-out
        focus:border-pink-600 focus:bg-black focus:text-white focus:outline-none
        "
          id="multisearchFormControlTextarea1"
          rows={10}
          placeholder={`Enter card names, one per line (max 100 lines)
1 Ajani's Chosen
1 Arcane Signet
Dockside Extortionist
Counterspell`}
          value={multiSearchInput}
          onChange={(e) => setMultiSearchInput(e.target.value)}
        ></textarea>
      </div>
      <button
        className="
            focus:shadow-outline
            mx-auto
            mt-4
            rounded
            bg-pink-600
            px-4
            py-2
            font-bold
            text-white
            hover:bg-pink-700
            focus:outline-none
          "
        type="button"
        // onClick={() => store.handleSubmit()}
        onClick={async () => {
          const result = parseMultiSearchInput(multiSearchInput);
          await fetchMultiSearchResults(result);
        }}
      >
        Search
      </button>
    </div>
  );
}
