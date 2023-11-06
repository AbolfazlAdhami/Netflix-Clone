import React from "react";
import Link from "next/link";
interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) return null;

  const pages = [
    { label: "Home", href: "/" },
    { label: "Series", href: "/" },
    { label: "Films", href: "/" },
    { label: "News & Popular", href: "/" },
    { label: "My List", href: "/" },
    { label: "Browse by Langueges", href: "/" },
  ];

  return (
    <div className="bg-black w-60 rounded-md  absolute top-10 py-2 flex flex-col gap-2 border-2 border-gray-600 ">
      {pages.map((page, index) => (
        <Link key={index} className="px-6 py-1 w-[95%]  mx-auto text-white text-start  duration-100 hover:border-b-[1px] hover:border-zinc-400" href={page.href}>
          {page.label}
        </Link>
      ))}
    </div>
  );
};

export default MobileMenu;
