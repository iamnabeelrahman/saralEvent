"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  CircleUserRound,
  LayoutGrid,
  Search,
  ShoppingBasket,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import GlobalApi from "../_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { UpdateListContext } from "../_context/UpdateListContext";
import ListItemsDetail from "./ListItemsDetail";
import { toast } from "sonner";

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [totalListItem, setTotalListItem] = useState(0);
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const { updateList, setUpdateList } = useContext(UpdateListContext);
  const [listItemDetails, setListItemDetails] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Ensure sessionStorage is accessed on the client side
    if (typeof window !== "undefined") {
      const jwt = sessionStorage.getItem("jwt");
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (jwt) {
        setIsSignedIn(true);
        setUser(user); // Set user to state
        setJwt(jwt); // Set jwt to state
      }
    }
  }, []);

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getListItems();
  }, [updateList, user, jwt]);

  //get category list
  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      // console.log("CatehoryList rep: ", res.data.data);
      setCategoryList(res.data.data);
    });
  };

  //get items list
  const getListItems = async () => {
    if (!user || !jwt) return;
    const listItems_ = await GlobalApi.getListItems(user.id, jwt);
    console.log("list item dertails: ", listItems_);
    setTotalListItem(listItems_?.length);
    setListItemDetails(listItems_);
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  const onDeleteItem = (documentId) => {
    console.log(documentId);    
    GlobalApi.deleteListItem(documentId, jwt)
      .then((res) => {
        // Optimistically remove the deleted item
        console.log("Deleted response:", res);  
        setListItemDetails((prevDetails) =>
          prevDetails.filter((item) => item.documentId !== documentId)
        );
        toast("Item removed");
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
        toast("Failed to remove item");
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
                <DropdownMenuItem
                  className="flex gap-2 items-center cursor-pointer"
                  key={category.id}
                >
                  <Image
                    width={23}
                    height={23}
                    src={
                      category?.icon?.url
                        ? category.icon.url
                        : "https://t4.ftcdn.net/jpg/08/49/36/01/360_F_849360193_JguSdX5IYrE9skrUYqsnix3eNj38D5Vq.jpg"
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
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg cursor-pointer">
              <ShoppingBasket className="h-7 w-7" />
              <span className="bg-primary text-white px-2 rounded-full">
                {totalListItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2">
                My Lists
              </SheetTitle>
              <SheetDescription>
                <ListItemsDetail
                  listItemDetails={listItemDetails}
                  onDeleteItem={onDeleteItem}/>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {!isSignedIn ? (
          <Link href={"/sign-in"}>
            <Button className="w-10 md:w-[70px]">Login</Button>{" "}
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserRound
                className="h-10 w-10
          bg-violet-100 text-primary p-2 rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="cursor-pointer">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem> */}
              <DropdownMenuItem className="cursor-pointer">
                My Tickets
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Saved Events
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onSignOut()}
                className="cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
