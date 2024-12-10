"use client"
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";

function EventDetails({ event }) {
    const [eventTicketPrice, setEventTicketPrice] = useState(event.price)
    const [ticketQuantity, setTicketQuantity]  = useState(event.ticketQuantity)


    console.log("event details", event);
    
  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-2 p-7
    bg-white text-black"
      >
        <Image
          src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + event.images[0].url}
          alt="event image"
          width={300}
          height={300}
          className="rounded-lg bg-slate-200 p-5 h-[320px] object-cover "
        />

        <div className="flex flex-col gap-3">
          {/* <h2 className='text-2xl font-bold'>{event.name}</h2> */}
          <h2 className="text-sm text-gray-500 line-clamp-4">
            {event.description}
          </h2>
          
          <h2 className="font-bold text-2xl">
            {`₹${event.price}`}
          </h2>
          <h2>Quantity: <span>{ticketQuantity}</span></h2>
          <div className="flex flex-col items-baseline">
            <div className="flex gap-3 items-center ">
            <div className="flex items-center gap-5 p-3 border-2 border-gray-300 rounded-md">
              <button disabled={ticketQuantity == 1} onClick={()=>setTicketQuantity(ticketQuantity - 1)}
              className="w-8 h-8 bg-gray-200 text-xl text-purple-600 rounded-full flex justify-center items-center hover:bg-purple-600 hover:text-white transition duration-300"> - </button>
              <h2 className="text-xl font-semibold text-gray-700">{ticketQuantity}</h2>
              
              <button onClick={()=>setTicketQuantity(ticketQuantity + 1)}
               className="w-8 h-8 bg-gray-200 text-xl text-purple-600 rounded-full flex justify-center items-center hover:bg-purple-600 hover:text-white transition duration-300"> + </button>
            </div>            
            <h2 className="text-2xl font-bold"> = ₹{ (ticketQuantity * eventTicketPrice).toFixed(2)}</h2>
            </div>
          </div>
          <div>
            <Button className="flex gap-3"><ShoppingBasket/>Add to List</Button>    
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
