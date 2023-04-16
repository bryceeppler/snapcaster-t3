import React from "react";
import Line from "./Line";
import { useStore } from "~/store";
import Loadingspinner from "./Loadingspinner";
type Props = {};

export default function PriceHistory({}: Props) {
  const { singleSearchPriceList: data } = useStore();
  return (
    <div className="mt-4 flex h-64 max-w-xl flex-col items-center justify-center space-x-4 rounded-md bg-zinc-900 p-5 sm:h-80">
      {/* <img
        src={`${data.image}`}
        alt='Card Image'
        className='h-40 w-auto rounded-md'
      /> */}
      <div className="text-sm font-extrabold text-white">Price History</div>
      <Line />
    </div>
  );
}
