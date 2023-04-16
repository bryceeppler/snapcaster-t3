import React from "react";
import StoreSelector from "./StoreSelector";
import Button from "./ui/Button";
import {
  deletePriceWatchEntry,
  getPriceWatchEntries,
  updatePriceWatchEntry,
} from "~/utils/supabase-client";
import { User } from "@supabase/supabase-js";
import CloseButton from "./CloseButton";

interface WatchlistEditProps {
  editCardName: string;
  handleEditInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchRef: React.RefObject<HTMLInputElement>;
  handleAutocompleteKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  showAutocomplete: boolean;
  autocompleteResults: string[];
  selectedAutocompleteIndex: number;
  handleAutocompleteItemClick: (result: string) => void;
  selectedWatchlistItem: any; // Replace 'any' with the appropriate type for selectedWatchlistItem
  subscription: any; // Replace 'any' with the appropriate type for subscription
  setSelectedScreen: (screen: string) => void;
  editIntervalHours: number;
  setEditIntervalHours: (interval: number) => void;
  editThreshold: number;
  editMinimumCondition: string;
  setEditMinimumCondition: (condition: string) => void;
  setEditThreshold: (threshold: number) => void;
  user: User;
  refreshWatchlist: () => void;
}

const WatchlistEdit: React.FC<WatchlistEditProps> = ({
  refreshWatchlist,
  editCardName,
  handleEditInputChange,
  searchRef,
  handleAutocompleteKeyDown,
  showAutocomplete,
  autocompleteResults,
  selectedAutocompleteIndex,
  handleAutocompleteItemClick,
  selectedWatchlistItem,
  subscription,
  setSelectedScreen,
  editIntervalHours,
  setEditIntervalHours,
  editThreshold,
  editMinimumCondition,
  setEditMinimumCondition,
  setEditThreshold,
  user,
}) => {
  const handleSubmit = async () => {
    await updatePriceWatchEntry(
      user,
      selectedWatchlistItem.id,
      editCardName,
      editThreshold,
      editIntervalHours,
      editMinimumCondition,
      "email",
      selectedWatchlistItem.websites
    );

    // refresh the watchlist
    refreshWatchlist();

    setSelectedScreen("home");
  };

  const handleDelete = async () => {
    await deletePriceWatchEntry(user, selectedWatchlistItem.id);
  };
  return (
    <div>
      <div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="text-xl font-extrabold">Edit Watchlist Item</div>
            <div className="mb-2 text-xs">
              You can edit the details of your watchlist item here.
            </div>
          </div>
          <CloseButton
            onClick={() => {
              setSelectedScreen("home");
            }}
          ></CloseButton>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex w-full flex-col">
            <label
              htmlFor="name"
              className="mt-4 block text-sm font-medium text-white"
            >
              Card Name
            </label>
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  className={`block w-full rounded-md border border-zinc-300 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm`}
                  placeholder="Search"
                  value={editCardName}
                  onChange={handleEditInputChange}
                  spellCheck="false"
                  ref={searchRef}
                  onKeyDown={(e) => handleAutocompleteKeyDown(e)}
                  //   defaultValue={selectedWatchlistItem.card_name}
                  // don't submit on enter
                />
                {showAutocomplete && (
                  <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-zinc-300  bg-zinc-900 py-1 shadow-md">
                    {autocompleteResults &&
                      autocompleteResults.map((result, index) => (
                        <div
                          key={result}
                          className={`mx-1 cursor-pointer rounded px-4 py-2 ${
                            selectedAutocompleteIndex === index
                              ? "bg-zinc-700"
                              : ""
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
                  value={editIntervalHours}
                  onChange={(e) =>
                    setEditIntervalHours(parseInt(e.target.value))
                  }
                >
                  <option
                    value={2}
                    disabled={subscription === null}
                  >{`2 hours ${
                    subscription === null ? "(Pro members only)" : ""
                  }`}</option>
                  <option
                    value={12}
                    disabled={subscription === null}
                  >{`12 hours ${
                    subscription === null ? "(Pro members only)" : ""
                  }`}</option>
                  <option value={24}>24 hours</option>
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
                  // step="0.1"
                  min="0"
                  //   disabled
                  value={editThreshold}
                  onChange={(e) =>
                    setEditThreshold(parseFloat(e.target.value) || 0)
                  }
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
                  Disabled for now. DMG is default and will notify if any card
                  goes below the threshold.
                </div>
                <select
                  id="condition"
                  className="mt-1 block w-full rounded-md border-gray-300 bg-zinc-800 py-2 pl-3 pr-10 text-base focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  value={editMinimumCondition}
                  onChange={(e) => setEditMinimumCondition(e.target.value)}
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
                  Notifications will only function if you are a beta tester.
                  They are still in development.
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
                We will support store-specific price monitoring in the future,
                for now all stores are monitored by default.
              </div>
              {/* <div className="text-xs mb-2">
            You can select which stores you want to monitor for this card. If
            you don't select any stores, all stores will be monitored.
          </div> */}
              {/* <StoreSelector /> */}
            </div>
          </div>
        </div>
        <div className="mt-6 flex w-full flex-col justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
          <Button
            onClick={async () => {
              await deletePriceWatchEntry(user, selectedWatchlistItem.id);
              refreshWatchlist();
              setSelectedScreen("home");
            }}
            className=""
            variant="error"
          >
            Delete
          </Button>
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
          <Button
            onClick={() => {
              handleSubmit();
            }}
            color="primary"
            className=""
            variant="slim"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistEdit;
