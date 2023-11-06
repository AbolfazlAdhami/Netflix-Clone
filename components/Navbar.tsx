import React, { useCallback, useState } from "react";
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import NavbarItem from "./NavbarItems";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

function Navbar() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackgroundm, setShowBackground] = useState(false);

  const toggleMobileMenu = useCallback(() => setShowMobileMenu((current) => !current), []);
  const toggleAccountMenu = useCallback(() => setShowAccountMenu((current) => !current), []);

  const pages = [
    { label: "Home", href: "/" },
    { label: "Series", href: "/" },
    { label: "Films", href: "/" },
    { label: "News & Popular", href: "/" },
    { label: "My List", href: "/" },
    { label: "Browse by Langueges", href: "/" },
  ];

  return (
    <nav className="w-full fixed z-40">
      <div className="px-4 md:px-16 py-4 flex items-center transition-all duration-500 ease-in bg-zinc-900 bg-opacity-90">
        <img className="h-10 lg:h-12" src={"/images/logo.png"} alt="" />
        <div className="flex-row ml-8 gap-6 hidden lg:flex">
          {pages.map((page, index) => (
            <NavbarItem key={index} label={page.label} href={page.href} />
          ))}
        </div>
        <div onClick={toggleMobileMenu} className="flex  lg:hidden ml-10 items-center gap-2 cursor-pointer relative">
          <p className="text-white text-sm ">Browse</p>
          <ChevronDownIcon className={`w-4 text-white transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex ml-auto gap-6 items-center">
          <div className="text-gray-200 hover:text-gray-400 transition cursor-pointer ">
            <MagnifyingGlassIcon className="w-5" />
          </div>
          <div className="text-gray-200 hover:text-gray-400 transition cursor-pointer ">
            <BellIcon className="w-5" />
          </div>
          <div className="flex items-center gap-2 cursor-pointer relative" onClick={toggleAccountMenu}>
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-red.png" alt="" />
            </div>
            <ChevronDownIcon className={`w-4 text-white transition ${showAccountMenu ? "rotate-180" : "rotate-0"}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
