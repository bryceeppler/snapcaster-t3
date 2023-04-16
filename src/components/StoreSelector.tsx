import React from "react";
import { useStore } from "~/store";

type Props = {};

export default function StoreSelector({}: Props) {
  const {
    websites,
    multiSearchSelectedWebsites,
    toggleMultiSearchSelectedWebsites,
    toggleMultiSearchSelectAllStores,
  } = useStore();

  return (
    <div className="flex flex-col">
      <div className="grid w-full grid-cols-2 rounded-md p-2 outline outline-1 outline-zinc-800 backdrop-blur-sm backdrop-brightness-75 md:grid-cols-3">
        {websites.map((website, index) => {
          return (
            <div
              key={index}
              className="m-1 flex items-center rounded-md bg-zinc-900 p-2 accent-pink-700 hover:bg-zinc-800"
              onClick={() => {
                toggleMultiSearchSelectedWebsites(website.name);
              }}
            >
              <div
                className={`

                    mx-1 h-2
                    w-2
                    rounded-full
                    ${
                      multiSearchSelectedWebsites.includes(website.name)
                        ? "bg-pink-600"
                        : "bg-zinc-600"
                    }
                `}
              />
              <label className="ml-2 truncate text-left text-xs">
                {website.name}
              </label>
            </div>
          );
        })}
      </div>

      <button
        className="
        focus:shadow-outline
        mx-auto
        my-4
        rounded
        bg-pink-600
        px-4
        py-2
        font-bold
        text-white
        hover:bg-pink-700
        focus:outline-none
      "
        onClick={() => {
          // let allSelected = {}
          // let noneSelected = {}
          // websites.forEach((website) => {
          //     allSelected[website.code] = true
          //     noneSelected[website.code] = false
          // })
          // if (JSON.stringify(store.websites) === JSON.stringify(allSelected)) {
          //     store.setWebsites(noneSelected)
          // } else {
          //     store.setWebsites(allSelected)
          // }
          toggleMultiSearchSelectAllStores();
        }}
      >
        Select All
      </button>
    </div>
  );
}
