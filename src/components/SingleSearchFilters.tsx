import React from "react";
import { useStore } from "~/store";

type Props = {};

export default function SearchFilters({}: Props) {
  const {
    showSingleSearchFilters,
    toggleShowSingleSearchFilters,
    toggleSingleSearchCondition,
    singleSearchConditions,
    resetSingleSearchFilters,
    singleSearchFoil,
    toggleSingleSearchFoil,
    setSingleSearchOrderBy,
    setSingleSearchOrder,
    singleSearchOrderBy,
    singleSearchOrder,
  } = useStore();
  const conditionCheckboxes = [
    // checkbox should have a label, and a reference to the store value
    { label: "NM", value: false },
    { label: "LP", value: false },
    { label: "PL", value: false },
    { label: "MP", value: false },
    { label: "HP", value: false },
    { label: "DMG", value: false },
    { label: "SCAN", value: false },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-center sm:p-2">
      {/* div for filters should always render but not be visible unless showFilters is true */}
      <div
        className={`flex w-full flex-col items-center justify-center transition-all ${
          showSingleSearchFilters ? "h-80 opacity-100" : "h-0 opacity-0"
        } rounded-md bg-zinc-900 shadow`}
      >
        {showSingleSearchFilters && (
          <>
            {/* selector for sort by */}
            <div className="flex flex-row items-center justify-between p-2">
              <div className="flex flex-row items-center justify-between p-2">
                <label className="mr-2 text-sm">Sort By</label>
                <select
                  className="rounded-md bg-zinc-800 p-1 text-sm"
                  onChange={(e) => {
                    // store.setSortBy(e.target.value);
                    setSingleSearchOrderBy(e.target.value);
                  }}
                  value={singleSearchOrderBy}
                >
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                  <option value="set">Set</option>
                  <option value="website">Website</option>
                </select>
              </div>
              <div>
                <select
                  className="rounded-md bg-zinc-800 p-1 text-sm"
                  value={singleSearchOrder}
                  onChange={(e) => {
                    // store.setSortOrder(e.target.value);
                    setSingleSearchOrder(e.target.value);
                  }}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            {/* foil only toggle */}
            <div className="flex flex-row items-center justify-between p-2">
              <span className="mr-3 text-sm font-medium">Foil only</span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  // checked={store.foilOnly}
                  checked={singleSearchFoil}
                  onChange={() => {
                    // store.setFoilOnly(!store.foilOnly);
                    toggleSingleSearchFoil();
                  }}
                />
                <div className="peer h-4 w-7 rounded-full bg-zinc-800 after:absolute after:left-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-pink-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 dark:border-zinc-600 dark:peer-focus:ring-pink-800"></div>
              </label>
            </div>
            <div className="mt-2 text-sm font-bold">Condition</div>
            {/* two columns for condition checkboxes */}
            <div className="grid max-w-md grid-cols-2 gap-x-10 py-4">
              {/* map checkboxes */}
              {conditionCheckboxes.map((checkbox, index) => (
                <div
                  key={index}
                  className="col-span-1 flex w-full flex-row items-center justify-between text-left"
                >
                  <label className="mr-1 text-sm">{checkbox.label}</label>
                  <input
                    type="checkbox"
                    className="text-sm accent-pink-300"
                    checked={
                      singleSearchConditions[checkbox.label.toLowerCase()]
                    }
                    // onChange={() => {
                    //   store.setConditions({
                    //     ...store.conditions,
                    //     [checkbox.label.toLowerCase()]: !checkbox.value,
                    //   });
                    // }}
                    onChange={() => {
                      toggleSingleSearchCondition(checkbox.label.toLowerCase());
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-row space-x-2">
              <button
                className="focus:shadow-outline mx-auto mt-1 rounded px-4 py-1 font-bold outline outline-2 -outline-offset-2 outline-zinc-500 transition-all hover:bg-pink-500 hover:bg-opacity-50 focus:outline-pink-900"
                onClick={() => {
                  resetSingleSearchFilters();
                }}
              >
                Clear
              </button>

              {/* <button
                className="transition-all bg-pink-600 hover:bg-pink-700 text-white font-bold py-1 px-4 rounded focus:outline-pink-900 focus:shadow-outline mt-1 mx-auto"
                onClick={() => {
                  console.log("Apply Filter");
                  // console.log("store.conditions", store.conditions);
                  // applyFilters(store);
                }}
              >
                Apply
              </button> */}
            </div>
          </>
        )}
      </div>

      <button
        className="text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50 dark:focus:ring-pink-800"
        onClick={() => {
          toggleShowSingleSearchFilters();
        }}
      >
        {showSingleSearchFilters ? "Hide Filters" : "Show Filters"}
      </button>
    </div>
  );
}
