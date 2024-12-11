"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateListContext } from "../_context/UpdateListContext";

function EventDetails({ event }) {
  const [eventTicketPrice, setEventTicketPrice] = useState(event.price);
  const [ticketQuantity, setTicketQuantity] = useState(event.ticketQuantity);
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { updateList, setUpdateList } = useContext(UpdateListContext);

  // Set JWT from sessionStorage after the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwt = sessionStorage.getItem("jwt");
      const user = JSON.parse(sessionStorage.getItem("user"));
      setJwt(jwt); // Set jwt to state
      setUser(user); // Set user to state
    }
  }, []);

  // Ensure there's no action until JWT is checked
  const addToList = () => {
    setLoading(true);
    if (jwt === null) {
      alert("Please Sign In");
      router.push("/sign-in");
      setLoading(false);
      return;
    }
    // Adding tickets to list logic if jwt exists
    const data = {
      data: {
        Quantity: ticketQuantity,
        amount: (ticketQuantity * eventTicketPrice).toFixed(2),
        events: event.id,
        users_permissions_user: user.id,
        userId: user.id,
      },
    };
    // console.log(data);

    GlobalApi.addToList(data, jwt).then(
      (res) => {
        // console.log(res);
        toast("added to Cart");
        setUpdateList(!updateList);
        setLoading(false);
      },
      (r) => {
        toast("Error while adding to cart");
        setLoading(false);
      }
    );
  };

  const decreaseQuantity = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity(ticketQuantity - 1);
    }
  };

  const increaseQuantity = () => {
    setTicketQuantity(ticketQuantity + 1);
  };

  const formatCurrency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
        <Image
          src={event.images[0]?.url}
          alt="event image"
          width={300}
          height={300}
          className="rounded-lg bg-slate-200 p-5 h-[320px] object-cover"
        />

        <div className="flex flex-col gap-3">
          <h2 className="text-sm text-gray-500 line-clamp-4">
            {event.description}
          </h2>
          <h2 className="font-bold text-2xl">
            {formatCurrency.format(event.price)}
          </h2>
          <h2>
            Quantity: <span>{ticketQuantity}</span>
          </h2>
          <div className="flex flex-col items-baseline">
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-5 p-3 border-2 border-gray-300 rounded-md">
                <button
                  disabled={ticketQuantity == 1}
                  onClick={decreaseQuantity}
                  className="w-8 h-8 bg-gray-200 text-xl text-purple-600 rounded-full flex justify-center items-center hover:bg-purple-600 hover:text-white transition duration-300"
                >
                  -
                </button>
                <h2 className="text-xl font-semibold text-gray-700">
                  {ticketQuantity}
                </h2>
                <button
                  onClick={increaseQuantity}
                  className="w-8 h-8 bg-gray-200 text-xl text-purple-600 rounded-full flex justify-center items-center hover:bg-purple-600 hover:text-white transition duration-300"
                >
                  +
                </button>
              </div>
              <h2 className="text-2xl font-bold">
                {" "}
                = ₹{(ticketQuantity * eventTicketPrice).toFixed(2)}
              </h2>
            </div>
          </div>
          <div>
            <Button
              disabled={loading}
              className="flex gap-3"
              onClick={addToList}
              aria-label="Add to list"
            >
              <ShoppingBasket /> {loading ? "Adding..." : "Add to List"}
            </Button>
          </div>
        </div>
      </div>
      <button className="border-2 border-purple-600 bg-transparent text-purple-600 font-semibold py-2 px-6 rounded-md hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300">
        View Details
      </button>
    </>
  );
}

export default EventDetails;
