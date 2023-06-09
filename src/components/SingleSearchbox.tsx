import React, { useEffect, useState, useRef, useCallback } from "react";
import { useStore } from "~/store";

type Props = {
  includePriceChart?: boolean;
};

export default function SingleSearchbox({ includePriceChart }: Props) {
  const {
    singleSearchInput,
    setSingleSearchInput,
    fetchSingleSearchResults,
    fetchPriceChart,
  } = useStore();
  const autocompleteEndpoint = "https://api.scryfall.com/cards/autocomplete?q=";
  const [autocompleteResults, setAutocompleteResults] = useState<string[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedAutocompleteIndex, setSelectedAutocompleteIndex] =
    useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSingleSearchInput(value);

    if (value.trim().length > 0) {
      // add artificial delay, only send on odd-numbered keystrokes
      if (value.length > 2 && value.length % 2 != 0) {
        fetch(autocompleteEndpoint + value)
          .then((response) => response.json())
          .then(
            (data: {
              object: string;
              total_values: number;
              data: string[];
            }) => {
              setAutocompleteResults(data.data);
              setShowAutocomplete(true);
              setSelectedAutocompleteIndex(-1);
            }
          )
          .catch((error) => {
            console.error("Error fetching autocomplete results: ", error);
          });
      }
    } else {
      setAutocompleteResults([]);
      setShowAutocomplete(false);
      setSelectedAutocompleteIndex(-1);
    }
  };

  const handleAutocompleteItemClick = (item: string) => {
    setSingleSearchInput(item);
    setAutocompleteResults([]);
    setShowAutocomplete(false);
    setSelectedAutocompleteIndex(-1);
  };

  const handleAutocompleteKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLDivElement>) => {
      const key = event.key;
      const totalResults = autocompleteResults.length;
      switch (key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedAutocompleteIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            return nextIndex < totalResults ? nextIndex : prevIndex;
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedAutocompleteIndex((prevIndex) => {
            const nextIndex = prevIndex - 1;
            return nextIndex >= 0 ? nextIndex : -1;
          });
          break;
        case "Enter":
          if (
            selectedAutocompleteIndex >= 0 &&
            selectedAutocompleteIndex < totalResults
          ) {
            const item = autocompleteResults[selectedAutocompleteIndex];
            item && handleAutocompleteItemClick(item);
            item && (await fetchSingleSearchResults(item));
            item && includePriceChart && (await fetchPriceChart(item));
          }
          break;

        case "ArrowRight":
          if (
            selectedAutocompleteIndex >= 0 &&
            selectedAutocompleteIndex < totalResults
          ) {
            const item = autocompleteResults[selectedAutocompleteIndex];
            item && handleAutocompleteItemClick(item);
            item && (await fetchSingleSearchResults(item));
            item && includePriceChart && (await fetchPriceChart(item));
          }
          break;

        case "Escape":
          setShowAutocomplete(false);
          setSelectedAutocompleteIndex(-1);
          break;
        default:
          break;
      }
    },
    [
      autocompleteResults,
      selectedAutocompleteIndex,
      setAutocompleteResults,
      setShowAutocomplete,
      setSelectedAutocompleteIndex,
    ]
  );

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowAutocomplete(false);
    if (singleSearchInput.trim().length > 0) {
      await fetchSingleSearchResults(singleSearchInput);
      if (includePriceChart) {
        await fetchPriceChart(singleSearchInput);
      }
    }
  };

  return (
    <div className="mt-6 w-full">
      <div className="relative">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className={`block w-full rounded-md border border-zinc-300 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm`}
            placeholder="Search"
            value={singleSearchInput}
            onChange={handleInputChange}
            spellCheck="false"
            ref={searchRef}
            onKeyDown={(e) => handleAutocompleteKeyDown(e)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-pink-500"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                fill="currentColor"
              />
            </svg>
          </button>
          {showAutocomplete && (
            <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-zinc-300  bg-zinc-900 py-1 shadow-md">
              {autocompleteResults &&
                autocompleteResults.map((result, index) => (
                  <div
                    key={result}
                    className={`mx-1 cursor-pointer rounded px-4 py-2 ${
                      selectedAutocompleteIndex === index ? "bg-zinc-700" : ""
                    } `}
                    onClick={() => handleAutocompleteItemClick(result)}
                  >
                    {result}
                  </div>
                ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
