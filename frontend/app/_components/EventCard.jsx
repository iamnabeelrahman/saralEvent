import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EventDetails from "./EventDetails";

function EventCard({ event }) {
  // console.log("event data: ", event);
  
  const imageUrl = event.images?.[0].url;
  // console.log("ievent data: ", event.categories[0].name);

  return (
    <div
      className="p-2 md:p-6 h-[300px] md:h-auto
    flex flex-col items-center justify-center gap-3 border rounded-lg
    hover:scale-105 hover:shadow-md transition-all ease-in-out cursor-pointer"
    >
      <Image
        src={
          imageUrl
            ? `${event.images[0]?.url}`
            : "https://t4.ftcdn.net/jpg/08/49/36/01/360_F_849360193_JguSdX5IYrE9skrUYqsnix3eNj38D5Vq.jpg"
        }
        alt={"Event image"}
        width={200}
        height={200}
        className=" h-[150px] md:h-[200px] w-[150px] md:w-[250px] object-contain"
      />

      <h2 className="font-bold text-lg">{event.name}</h2>
      <h2>₹{event.price}</h2>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary"
          >
            {" "}
            Add to list
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold'>{event.name}</DialogTitle>
            <DialogDescription>
            <h2 className="text-primary">{event.categories?.name}</h2>

            <EventDetails event={event}/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

     
    </div>
  );
}

//  {eventList.map((event, index) => index<12&&(
 // <EventCard key={index}  event={event}/>
//))}

export default EventCard;
