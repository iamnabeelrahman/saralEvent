"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
const LeftSidebar = () => {
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

  const [pathname, setPathname] = useState("");

  useEffect(() => {
    // Only set pathname after component mounts on the client-side
    setPathname(window.location.pathname);
  }, []);

  if (pathname === "") return null; // Prevent render until pathname is set

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-5 2xl:w-[300px]">
      <nav className="flex flex-col gap-4">
      <Link href="/profile" className="mb-12 cursor-pointer text-center gap-2 text-gray-950">
          <h1 className="2xl:text-26 font-sans text-[26px] font-bold text-black-1 max-xl:hidden;">Dashboard</h1>
        </Link>
        

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={`flex gap-3 items-center py-1 md:p-3 2xl:p-6 rounded-lg justify-center xl:justify-start ${isActive ? "bg-purple-400" : ""}`}
            >
              {/* <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={`${isActive ? "brightness-[3] invert-0" : ""}`}
                />
              </div> */}
              <p className={`text-16 font-semibold text-gray-900 max-xl:hidden ${isActive ? "!text-white" : ""}`}>
                {item.label}
              </p>
            </Link>
          );
        })}
        {/* USER */}
      </nav>

      {/* FOOTER */}
    </section>
  );
};

export default LeftSidebar;
