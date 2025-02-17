"use client";

import Image from "next/image";
import React from "react";
import EventDetails from "./EventDetails";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  description?: string | null;
  date: Date;
  location: string;
  price: number;
  categoryId?: string | null;
  organiserId?: string | null;
  channelId?: string | null;
  createdAt?: Date | null;
  eventImage?:string | null; // Added for image support
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  // Ensure there's a fallback image
  // const eventImage = "https://st.depositphotos.com/1368414/2983/i/450/depositphotos_29838871-The-word-Events.jpg";

  return (
    <div
      className="p-2 md:p-6 h-[300px] md:h-auto
    flex flex-col items-center justify-center gap-3 border rounded-lg
    hover:scale-105 hover:shadow-md transition-all ease-in-out cursor-pointer"
    >
      <Image
        src={"https://st.depositphotos.com/1368414/2983/i/450/depositphotos_29838871-The-word-Events.jpg" }
        alt="Event image"
        width={200}
        height={200}
        className="h-[150px] md:h-[200px] w-[150px] md:w-[250px] object-contain"
      />

      <h2 className="font-bold text-lg">{event.title}</h2>
      <h2>₹{event.price}</h2>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary"
            // onClick={() => GlobalApi.increaseClick(event.id)}
          >
            Add to list
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{event.title}</DialogTitle>
            <DialogDescription>
              <EventDetails event={event} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventCard;
