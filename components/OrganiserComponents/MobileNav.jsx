"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      imgURL: "/icons/home.svg",
      route: "/profile",
      label: "Profile",
    },
    {
      imgURL: "/icons/inr-circle.svg",
      route: "/dashboard/my-channels",
      label: "My Channels",
    },
    {
      imgURL: "/icons/transaction.svg",
      route: "/dashboard/my-events",
      label: "My Events",
    },
    {
      imgURL: "/icons/money-send.svg",
      route: "/dashboard/settings",
      label: "Settings",
    },
  ];
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="border-none bg-white ">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1 px-4"
          >
            <h1 className="font-bold text-26 font-ibm-plex-serif">
              Saral Events
            </h1>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={`flex gap-3 items-center p-4 rounded-lg w-full max-w-60 ${
                          isActive ? "bg-purple-400" : ""
                        }`} 
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={`${
                            isActive ? "brightness-[3] invert-0" : ""
                          }`}
                        />
                        <p
                          className={`text-16 font-semibold text-gray-900 ${
                            isActive ? "text-white" : ""
                          }`}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}

                {/* USER */}
              </nav>
            </SheetClose>

            {/* FOOTER */}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
