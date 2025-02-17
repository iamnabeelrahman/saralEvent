"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { UpdateListContext } from "../_context/UpdateListContext";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description?: string | null;
  date: Date;
  location: string;
  price: number;
  eventImage?: string | null;
}

interface User {
  id: string;
}

interface EventDetailsProps {
  event: Event;
}

const EventDetails = ({ event }:EventDetailsProps) => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [jwt, setJwt] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const { updateList, setUpdateList } = useContext(UpdateListContext);



  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 bg-gray-50 rounded-lg shadow-md">
      {/* Event Image */}
      <div className="flex justify-center items-center">
        <Image
          src={event.eventImage || "/default-image.jpg"}
          alt="Event image"
          width={350}
          height={350}
          className="rounded-lg object-cover border border-gray-300 shadow-sm"
        />
      </div>

      {/* Event Details */}
      <div className="flex flex-col gap-6">
        {/* Event Title */}
        <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>

        {/* Event Description */}
        <div>
          <h3 className="text-gray-700 text-lg font-medium mb-2">Event Description</h3>
          <p className="text-gray-500 leading-relaxed">{event.description || "No description available"}</p>
        </div>

        {/* Ticket Price */}
        <div>
          <h3 className="text-gray-700 text-lg font-medium">Price</h3>
          <p className="text-2xl font-semibold text-green-600">{(event.price)}</p>
        </div>

        {/* Quantity Selector */}
        <div>
          <h3 className="text-gray-700 text-lg font-medium mb-2">Select Quantity</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-5 bg-white border border-gray-300 rounded-md shadow-sm p-2">
              <button
                disabled={ticketQuantity === 1}
                onClick={() => setTicketQuantity((prev) => Math.max(1, prev - 1))}
                className="w-9 h-9 flex justify-center items-center text-gray-700 bg-gray-100 rounded-full hover:bg-purple-600 hover:text-white transition duration-300 disabled:opacity-50"
              >
                -
              </button>
              <span className="text-lg font-semibold">{ticketQuantity}</span>
              <button
                onClick={() => setTicketQuantity((prev) => prev + 1)}
                className="w-9 h-9 flex justify-center items-center text-gray-700 bg-gray-100 rounded-full hover:bg-purple-600 hover:text-white transition duration-300"
              >
                +
              </button>
            </div>
            <p className="text-xl font-semibold text-blue-700">
              Total: {(ticketQuantity * event.price)}
            </p>
          </div>
        </div>

        {/* Add to List Button */}
        <Button
          disabled={loading}
          // onClick={addToList}
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
};

export default EventDetails;
