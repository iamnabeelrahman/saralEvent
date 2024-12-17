import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Importing the carousel components
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Slider({ sliderList }) {
  // console.log(sliderList );
  
  return (
    <div className="relative w-full">
      {/* Carousel Content with Images */}
      <Carousel>
        <CarouselContent>
          {sliderList.map((slider, index) => (
            <CarouselItem key={index} className="flex justify-center items-center">
              <Image
                src={slider.image[0].url}
                alt={`Slider photo`}
                width={800}
                height={400}
                className="object-cover w-full h-[60vh] rounded-2xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Dark Overlay for Text - Positioned Over the Carousel */}
      <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div> {/* Dark semi-transparent overlay */}

      {/* Text and Button */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-8 lg:px-16 z-10 w-full">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          Discover Your Next Event
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 text-white">
          Explore exciting events happening near you!
        </p>
        <Link href="/events">
          <Button className="bg-purple-600 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-purple-700 transition duration-300">
            See Upcoming Events
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Slider;
