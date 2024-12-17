"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateListContext } from "../_context/UpdateListContext";
import Link from "next/link";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 bg-gray-50 rounded-lg shadow-md">
      {/* Event Image */}
      <div className="flex justify-center items-center">
        <Image
          src={event.images?.[0]?.url || "/default-image.jpg"}
          alt="event image"
          width={350}
          height={350}
          className="rounded-lg object-cover border border-gray-300 shadow-sm"
        />
      </div>

      {/* Event Details */}
      <div className="flex flex-col gap-6">
        {/* Event Description */}
        <div>
          <h2 className="text-gray-700 text-lg font-medium mb-2">Event Description</h2>
          <p className="text-gray-500 leading-relaxed">
            {event.description || "No description available"}
          </p>
        </div>

        {/* Ticket Price */}
        <div>
          <h2 className="text-gray-700 text-lg font-medium">Price</h2>
          <p className="text-2xl font-semibold text-green-600">
            {formatCurrency.format(event.price)}
          </p>
        </div>

        {/* Quantity Selector */}
        <div>
          <h2 className="text-gray-700 text-lg font-medium mb-2">Select Quantity</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-5 bg-white border border-gray-300 rounded-md shadow-sm p-2">
              <button
                disabled={ticketQuantity === 1}
                onClick={decreaseQuantity}
                className="w-9 h-9 flex justify-center items-center text-gray-700 bg-gray-100 rounded-full hover:bg-purple-600 hover:text-white transition duration-300 disabled:opacity-50"
              >
                -
              </button>
              <span className="text-lg font-semibold">{ticketQuantity}</span>
              <button
                onClick={increaseQuantity}
                className="w-9 h-9 flex justify-center items-center text-gray-700 bg-gray-100 rounded-full hover:bg-purple-600 hover:text-white transition duration-300"
              >
                +
              </button>
            </div>
            <div>
              <p className="text-xl font-semibold text-blue-700">
                Total: {formatCurrency.format(ticketQuantity * eventTicketPrice)}
              </p>
            </div>
          </div>
        </div>

        {/* Add to List Button */}
        <Button
          disabled={loading}
          onClick={addToList}
          className="flex gap-3 items-center justify-center px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition duration-300 disabled:opacity-50"
        >
          <ShoppingBasket className="w-5 h-5" />
          {loading ? "Adding..." : "Add to Cart"}
        </Button>

        {/* View Details Button */}
        <Link href={`/events/${event.id}`}>
        <Button variant="outline" className="text-primary hover:text-white hover:bg-primary">
          View Details
        </Button>
      </Link>
      </div>
    </div>
  );
}

export default EventDetails;
