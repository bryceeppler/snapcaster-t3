import React from "react";

export default function Loadingspinner() {
  return (
    <button
      type="button"
      className="flex items-center rounded-lg bg-pink-600 p-4 font-bold text-white shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
    >
      <svg
        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
        ></path>
      </svg>
      Processing...
    </button>
  );
}
