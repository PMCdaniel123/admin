"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/constant";
import { usePathname } from "next/navigation";

const LeftSideBar = () => {
  const pathName = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky px-10 flex flex-col gap-10 bg-quaternary shadow-xl max-lg:hidden">
      <Image src={"/logo.png"} alt="log" width={200} height={200} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathName === link.url ? "text-primary" : "text-tertiary"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium text-center items-center">
        <UserButton />
        <p className="text-primary">Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
