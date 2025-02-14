'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { CircleUserRound, LayoutGrid, Search, ShoppingBasket } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UpdateListContext } from 'context/UpdateListContext';
import ListItemsDetail from './ListItemsDetail';
import { toast } from 'sonner';
import SignOut from './SignOut';

interface Category {
  id: string | number; // or whichever type the 'id' should be
  name: string;
  icon?: {
    url: string;
  };
}

function Header() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [totalListItem, setTotalListItem] = useState(0);
  const [jwt, setJwt] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // const { updateList, setUpdateList } = useContext(UpdateListContext);
  const [listItemDetails, setListItemDetails] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const userItem = localStorage.getItem('user');
      console.log('token', token);

      if (userItem) {
        const user = JSON.parse(userItem);
        console.log('user: ', user);

        if (token) {
          setIsSignedIn(true);
          console.log('isUser? : ', isSignedIn);

          setToken(token);
          setUser(user);
        }
      }
    }
  }, []);

  useEffect(() => {
    getCategoryList();
  }, []);

  // useEffect(() => {
  //   getListItems();
  // }, [updateList, user, jwt]);

  //get category list
  const getCategoryList = () => {};

  //get items list
  const getListItems = async () => {};

  const onSignOut = () => {
    sessionStorage.clear();
    router.push('/sign-in');
  };

  const onDeleteItem = () => {};

  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    let total = 0;

    setSubtotal(5);
  }, [listItemDetails]);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ease-in-out">
      <div className="flex justify-between p-4 shadow-sm">
        <div className="flex items-center gap-8">
          <Link href="/" passHref>
            <span className="text-base font-bold text-purple-600 transition-colors hover:text-indigo-600 md:text-3xl">
              Saral Events
            </span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h2 className="hidden cursor-pointer items-center gap-2 rounded-full border bg-gray-200 p-2 px-10 md:flex">
                <LayoutGrid className="h-5 w-5" /> Categories
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categoryList.map((category, index) => (
                <Link key={index} href={'/events-category/' + category.name}>
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-2"
                    key={category.id}
                  >
                    <Image
                      width={23}
                      height={23}
                      src={
                        category?.icon?.url
                          ? category.icon.url
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

          <div className="hidden items-center gap-3 rounded-full border p-2 px-5 md:flex">
            <Search />
            <input className="outline-none" type="text" placeholder="Search" />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Sheet>
            <SheetTrigger>
              <h2 className="flex cursor-pointer items-center gap-2 text-lg">
                <ShoppingBasket className="h-7 w-7" />
                <span className="rounded-full bg-primary px-2 text-white">{totalListItem}</span>
              </h2>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="bg-primary p-2 text-lg font-bold text-white">
                  My Lists
                </SheetTitle>
                <SheetDescription>
                  <ListItemsDetail listItemDetails={listItemDetails} onDeleteItem={onDeleteItem} />
                </SheetDescription>
              </SheetHeader>
              <SheetClose asChild>
                <div className="absolute bottom-6 flex w-[90%] flex-col">
                  <h2 className="flex justify-between text-lg font-bold">
                    Subtotal <span>{subtotal}</span>
                  </h2>
                  <Button onClick={() => router.push(jwt ? '/checkout' : '/sign-in')}>
                    Checkout
                  </Button>
                </div>
              </SheetClose>
            </SheetContent>
          </Sheet>

          {!isSignedIn ? (
            <Link href={'/sign-in'}>
              <Button className="w-10 md:w-[70px]">Login</Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <CircleUserRound className="h-10 w-10 cursor-pointer rounded-full bg-violet-100 p-2 text-primary" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="cursor-pointer">
                <Link href={'/profile'}>
                  {' '}
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>{' '}
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">My Tickets</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Saved Events</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
