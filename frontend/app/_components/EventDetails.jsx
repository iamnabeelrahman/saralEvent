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
  const [eventTicketPrice, setEventTicketPrice] = useState(event?.price || 0);
  const [ticketQuantity, setTicketQuantity] = useState(event?.ticketQuantity || 1);
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { updateList, setUpdateList } = useContext(UpdateListContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwt = sessionStorage.getItem("jwt");
      const user = JSON.parse(sessionStorage.getItem("user"));
      setJwt(jwt || null);
      setUser(user || null);
    }
  }, []);

  const addToList = () => {
    setLoading(true);
    if (!jwt || !user?.id || jwt === null) {
      alert("Please Sign In");
      router.push("/sign-in");
      setLoading(false);
      return;
    }

    const data = {
      data: {
        Quantity: ticketQuantity,
        amount: (ticketQuantity * eventTicketPrice).toFixed(2),
        events: event.id,
        users_permissions_user: user.id,
        userId: user.id,
      },
    };

    GlobalApi.addToList(data, jwt).then(
      () => {
        toast("Added to Cart");
        setUpdateList(!updateList);
        setLoading(false);
      },
      (error) => {
        toast("Error while adding to cart", error);
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

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={event.images?.[0]?.url || "/default-image.jpg"}
        alt="event image"
        width={300}
        height={300}
        className="rounded-lg bg-slate-200 p-5 h-[320px] object-cover"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-sm text-gray-500 line-clamp-4">
          {event.description || "No description available"}
        </h2>
        <h2 className="font-bold text-2xl">
          {formatCurrency.format(event.price)}
        </h2>
        <h2>Quantity: <span>{ticketQuantity}</span></h2>
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
              {formatCurrency.format(ticketQuantity * eventTicketPrice)}
            </h2>
          </div>
        </div>
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
  );
}

export default EventDetails;
