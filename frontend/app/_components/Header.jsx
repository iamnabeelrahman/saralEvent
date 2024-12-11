"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutGrid, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GlobalApi from "../_utils/GlobalApi";

function Header() {
  const [categoryList, setCategoryList] = useState([]);

  const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
    // Ensure sessionStorage is accessed on the client side
    if (typeof window !== "undefined") {
      const jwt = sessionStorage.getItem("jwt");
      if (jwt) {
        setIsSignedIn(true);
      }
    }
  }, []);
  
  useEffect(() => {
    getCategoryList();
  }, []);

  /**
   * get category list
   */
  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
  //    console.log("CatehoryList rep: ", res.data.data);
      setCategoryList(res.data.data);
    });
  };
  return (
    <div className="flex p-4 shadow-sm justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" passHref>
          <span className=" text-base md:text-3xl font-bold text-purple-600 hover:text-indigo-600 transition-colors">
          Saral Events
          </span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-gray-200 cursor-pointer">
              <LayoutGrid className="h-5 w-5 " /> Categories
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
                <Link key={index} href={"/events-category/" + category.name}>
              <DropdownMenuItem className="flex gap-2 items-center cursor-pointer" key={category.id}>
              <Image
                  width={23}
                  height={23}
                  src={
                    category?.icon?.url
                      ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.icon.url
                      : 'https://t4.ftcdn.net/jpg/08/49/36/01/360_F_849360193_JguSdX5IYrE9skrUYqsnix3eNj38D5Vq.jpg'
                  }
                  alt="category icon"
                ></Image>
                <h2>{category.name}</h2>
                
              </DropdownMenuItem>

              </Link>
            ))}
          </DropdownMenuContent>
          
        </DropdownMenu>

        <div className=" hidden md:flex gap-3 items-center border rounded-full p-2 px-5">
          <Search />
          <input className="outline-none" type="text" placeholder="Search" />
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <h2 className="flex gap-2 items-center text-lg cursor-pointer ">
          <Image
            src="/savedEvent.png"
            alt="Saved Event"
            width={25}
            height={20}
          />
          0
        </h2>
     {!isSignedIn && <Link href={'/sign-in'}><Button className="w-10 md:w-[70px]">Login</Button> </Link> }
      </div>
    </div>
  );
}

export default Header;
