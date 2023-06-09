import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

export default function Navbar() {
  const currentPath = useRouter().pathname;
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, isSignedIn, isLoaded } = useUser();

  const logoSrc = "/logo.png";
  const pages = [
    { name: "Home", href: "/", current: currentPath === "/" },
    // { name: "Stocks", href: "/stocks", current: currentPath === "/stocks" },
    {
      name: "Multi-search",
      href: "/multisearch",
      current: currentPath === "/multisearch",
    },
    { name: "Sealed", href: "/sealed", current: currentPath === "/sealed" },
    {
      name: "Watchlist",
      href: "/watchlist",
      current: currentPath === "/watchlist",
    },
    // { name: 'Membership', href: '/pricing', current: currentPath === '/pricing' },
    { name: "About", href: "/about", current: currentPath === "/about" },
    { name: "Profile", href: "/account", current: currentPath === "/account" },
  ];
  return (
    <div>
      <nav className="shadow">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed. */}
                {/* Menu open: "hidden", Menu closed: "block" */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Icon when menu is open. */}
                {/* Menu open: "block", Menu closed: "hidden" */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-8 w-auto lg:hidden"
                  src="/favicon.ico"
                  alt="Workflow"
                />
                {/* dark mode show logo.png, light mode show logo-light.png */}
                {}
                <img
                  className="mb-2 hidden h-8 w-auto lg:block"
                  src={logoSrc}
                  alt="Workflow"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block sm:w-full">
                <div className="flex w-full space-x-4">
                  {pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className={`
 rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-600 
${page.current ? "bg-zinc-800 text-white hover:bg-zinc-600" : ""} 
`}
                    >
                      {page.name}
                    </a>
                  ))}

                  {/* User ? */}
                  <div className="flex-1" />
                  <div
                    className={`
 rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-600
`}
                  >
                    {isSignedIn ? <SignOutButton /> : <SignInButton />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  mobile menu opens when mobileMenuOpen = true */}
          <div
            className={`${mobileMenuOpen ? "block h-fit" : "hidden"} sm:hidden`}
            id="mobile-menu"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              {pages.map((page) => (
                <Link
                  href={page.href}
                  as={page.href}
                  key={page.name}
                  className={`
                    block rounded-md px-3 py-2 text-sm font-medium
                    ${page.current ? "bg-zinc-600 text-white" : ""} 
                    `}
                >
                  {page.name}
                </Link>
              ))}
              {/* USER STUFF */}
              <div
                className={`
 rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-400
`}
              >
                {isSignedIn ? <SignOutButton /> : <SignInButton />}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
