import React from "react";
import Button from "~/components/ui/Button";
import StoreSelector from "./StoreSelector"; // Import the StoreSelector component if it's not in the same file
import {
  getPriceWatchEntries,
  addPriceWatchEntry,
} from "~/utils/supabase-client";
import { WatchlistItem } from "~/pages/watchlist";
import { User } from "@supabase/supabase-js";
import { Subscription } from "~/types";
import CloseButton from "./CloseButton";

type Props = {
  user: User | null;
  cardName: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutocompleteKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showAutocomplete: boolean;
  autocompleteResults: string[];
  selectedAutocompleteIndex: number;
  handleAutocompleteItemClick: (result: string) => void;
  intervalHours: number;
  setIntervalHours: (value: number) => void;
  threshold: number;
  setThreshold: (value: number) => void;
  minimumCondition: string;
  setMinimumCondition: (value: string) => void;
  searchRef: React.MutableRefObject<HTMLInputElement | null>;
  setSelectedScreen: (screen: string) => void;
  setWatchlist: (value: WatchlistItem[]) => void;
  subscription: Subscription | null;
};

const WatchlistAdd: React.FC<Props> = ({
  user,
  cardName,
  handleInputChange,
  handleAutocompleteKeyDown,
  showAutocomplete,
  autocompleteResults,
  selectedAutocompleteIndex,
  handleAutocompleteItemClick,
  intervalHours,
  setIntervalHours,
  threshold,
  setThreshold,
  minimumCondition,
  setMinimumCondition,
  searchRef,
  setSelectedScreen,
  setWatchlist,
  subscription,
}) => {
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (user) {
            await addPriceWatchEntry(
              user,
              cardName,
              threshold,
              intervalHours,
              minimumCondition,
              "email",
              "all"
            );
            await getPriceWatchEntries(user).then((res) => {
              setWatchlist(res as WatchlistItem[]);
            });
          }
          setSelectedScreen("home");
        }}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="text-xl font-extrabold">
              {" "}
              Add a card to your watchlist
            </div>
            <div className="mb-2 text-xs">
              You can add a card to your watchlist by entering the name of the
              card below.{" "}
            </div>
          </div>
          <CloseButton
            onClick={() => {
              setSelectedScreen("home");
            }}
          ></CloseButton>
        </div>
        <div className="mt-6 w-full">
          <div className="relative">
            <input
              type="text"
              className={`block w-full rounded-md border border-zinc-300 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm`}
              placeholder="Search"
              value={cardName}
              onChange={handleInputChange}
              spellCheck="false"
              ref={searchRef}
              onKeyDown={(e) => handleAutocompleteKeyDown(e)}
              // don't submit on enter
            />
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
          </div>
        </div>
        {/* Settings */}
        <div className="mt-6">
          <div className="text-xl font-extrabold">Settings</div>
          <div className="mb-2 text-xs">
            You can set the price threshold for this card. If the price of the
            card drops below this threshold, you will be notified.
          </div>
          <div>
            {/* Interval selector */}
            <label
              htmlFor="interval"
              className="block text-sm font-medium text-white"
            >
              Check Interval
            </label>
            <select
              id="interval"
              className="mt-1 block w-full rounded-md border-gray-300 bg-zinc-800 py-2 pl-3 pr-10 text-base focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
              value={intervalHours}
              onChange={(e) => setIntervalHours(parseInt(e.target.value))}
            >
              <option value={1} disabled={subscription === null}>{`1 hours ${
                subscription === null ? "(Pro members only)" : ""
              }`}</option>
              <option value={6} disabled={subscription === null}>{`6 hours ${
                subscription === null ? "(Pro members only)" : ""
              }`}</option>
              <option value={12}>12 hours</option>
            </select>
            {/* Price input field */}
            <label
              htmlFor="price"
              className="mt-4 block text-sm font-medium text-white"
            >
              Price Threshold (CAD)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 bg-zinc-800 px-3 py-2 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
            />
            {/* Condition selector */}
            <label
              htmlFor="condition"
              className="mt-4 block text-sm font-medium text-white"
            >
              Minimum Card Condition
            </label>
            <div className="mb-2 text-xs">
              Disabled for now. DMG is default and will notify if any card goes
              below the threshold.
            </div>
            <select
              id="condition"
              className="mt-1 block w-full rounded-md border-gray-300 bg-zinc-800 py-2 pl-3 pr-10 text-base focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
              value={minimumCondition}
              onChange={(e) => setMinimumCondition(e.target.value)}
              disabled
            >
              <option value={"nm"}>NM</option>
              <option value={"lp"}>LP</option>
              <option value={"mp"}>MP</option>
              <option value={"hp"}>HP</option>
              <option value={"dmg"}>DMG</option>
            </select>
            {/* Notification method selector */}
            <label
              htmlFor="notification"
              className="mt-4 block text-sm font-medium text-white"
            >
              Notify me via
            </label>
            <div className="mb-2 text-xs text-pink-400">
              Notifications will only function if you are a beta tester. They
              are still in development.
            </div>
            <select
              id="notification"
              className="mt-1 block w-full rounded-md border-gray-300 bg-zinc-800 py-2 pl-3 pr-10 text-base focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
            >
              <option>Email</option>
              <option disabled>SMS</option>
            </select>
          </div>
        </div>
        {/* Stores */}
        <div className="mt-6">
          <div className="text-xl font-extrabold">Stores</div>
          <div className="mb-2 text-xs">
            We will support store-specific price monitoring in the future, for
            now all stores are monitored by default.
          </div>
          {/* <div className="text-xs mb-2">
            You can select which stores you want to monitor for this card. If
            you don't select any stores, all stores will be monitored.
          </div> */}
          {/* <StoreSelector /> */}
        </div>
        {/* Disclaimer */}
        <p className="my-2 mt-8 text-xs">
          Please note that I cannot guarantee the accuracy or completeness of
          the data used for price monitoring. This service is provided on a
          best-effort basis and relies on the availability and status of the
          websites being scraped. As the web scrapers depend on the structure of
          the vendor's websites, it is important to understand that changes or
          updates to these websites may impact the accuracy and functionality of
          our scrapers. I aim to update and maintain the web scrapers to
          accommodate these changes, but there may be periods of time when data
          accuracy is affected. By using this service, you acknowledge these
          limitations and agree to use the information provided at your own
          discretion and risk.
        </p>
        <div className="mt-6 flex w-full justify-center space-x-6">
          <Button
            onClick={() => {
              setSelectedScreen("home");
            }}
            color="primary"
            className=""
            variant="slim"
          >
            Cancel
          </Button>
          <Button type="submit" color="primary" className="" variant="slim">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WatchlistAdd;
