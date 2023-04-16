import React from "react";
import { useStore } from "~/store";

type Props = {};

export default function SealedSearchFilters({}: Props) {
  const {
    setSealedSearchOrder: setSortOrder,
    setSealedSearchOrderBy: setSortBy,
    toggleSealedFilterTag: toggleFilterTag,
    sealedFilterTags: filterTags,
    sealedSearchOrderBy: sortBy,
    sealedSearchOrder: sortOrder,
  } = useStore();
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row items-center justify-center p-2">
        <div className="flex flex-row items-center p-2">
          <label className="mr-2 text-sm">Sort By</label>
          <select
            className="rounded-md bg-zinc-700 p-1 text-sm"
            value={sortBy}
            onChange={(e) => {
              if (e.target.value === "price") {
                setSortBy("price");
              }
              if (e.target.value === "website") {
                setSortBy("website");
              }
            }}
          >
            <option value="price">Price</option>
            <option value="website">Website</option>
          </select>
        </div>
        <div>
          <select
            className="rounded-md bg-zinc-700 p-1 text-sm"
            value={sortOrder}
            onChange={(e) => {
              if (e.target.value === "asc") {
                setSortOrder("asc");
              }
              if (e.target.value === "desc") {
                setSortOrder("desc");
              }
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {/* Tag selectors are in a row, with overlow that wraps to another row*/}
      <div className="flex flex-row flex-wrap items-center justify-center py-2">
        {filterTags.map((tag, index) => {
          return (
            // if tag.selected, baground is purple, otherwise it's gray
            <div
              key={index}
              className={`m-1 flex cursor-pointer flex-row items-center justify-center rounded-md p-2 text-sm text-white transition-all hover:bg-pink-500 ${
                tag.selected ? "bg-pink-700" : "bg-zinc-700"
              }`}
              onClick={() => {
                toggleFilterTag(tag);
              }}
            >
              {tag.displayName}
            </div>
          );
        })}
      </div>
    </div>
  );
}
