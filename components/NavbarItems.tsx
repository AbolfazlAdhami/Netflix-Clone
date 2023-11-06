import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface NavbarItemsProps {
  label: string;
  href: string;
}

const NavbarItem: React.FC<NavbarItemsProps> = ({ label, href }) => {
  const [active, setActive] = useState(false);
  const { asPath } = useRouter();

  useEffect(() => {
    switch (asPath) {
      case "/":
        if (label == "Home") setActive(true);
        break;

      default:
        break;
    }
  }, [asPath, active, label]);
  return (
    <Link href={href} className={active ? "text-white cursor-auto" : "text-gray-400 cursor-pointer transition"}>
      {label}
    </Link>
  );
};

export default NavbarItem;
