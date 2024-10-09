"use client";

import { navLinks } from "@/lib/constant";
import { UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const TopBar = () => {
  const [dropdownMenu, setDropDownMenu] = useState(false);
  const pathName = usePathname();

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 bg-white shadow-lg lg:hidden">
      <Image src={"/logo.png"} alt="log" width={100} height={100} />

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathName === link.url ? "text-primary" : "text-tertiary"
            }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="relative flex gap-4 text-center">
        <MenuIcon
          className="cursor-pointer md:hidden text-primary"
          onClick={() => setDropDownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className={`flex gap-4 text-body-medium hover:bg-quaternary w-full hover:text-primary ${
                  pathName === link.url ? "text-primary" : "text-tertiary"
                }`}
                onClick={() => setDropDownMenu(false)}
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
