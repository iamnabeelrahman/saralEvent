import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'; // Importing the carousel components
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Slider {
  id: number; // id of the slider
  title: string; // title of the slider
  imageUrl: string; // image URL of the slider
}

interface SliderProps {
  sliderList: Slider[]; // Array of Slider objects
}

function Slider({ sliderList }: SliderProps) {
  return (
    <div className="relative w-full">
      {/* Carousel Content with Images */}
      <Carousel>
        <CarouselContent>
          {sliderList && sliderList.length > 0 ? (
            sliderList.map((slider, index) => (
              <CarouselItem key={index} className="flex items-center justify-center">
                <Image
                  src={slider.imageUrl}
                  alt={`Slider photo`}
                  width={800}
                  height={400}
                  className="h-auto w-full rounded-2xl object-cover md:h-[60vh]"
                />
              </CarouselItem>
            ))
          ) : (
            // Fallback image when slider data is not available
            <CarouselItem className="flex items-center justify-center">
              <Image
                src="/hero.jpg" // Image from the public folder
                alt="Fallback Hero Image"
                width={800}
                height={400}
                className="h-[60vh] w-full rounded-2xl object-cover"
              />
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* Dark Overlay for Text - Positioned Over the Carousel */}
      <div className="absolute inset-0 rounded-2xl bg-black opacity-50"></div>{' '}
      {/* Dark semi-transparent overlay */}
      {/* Text and Button */}
      <div className="absolute inset-0 z-10 flex w-full flex-col items-center justify-center px-4 text-center sm:px-8 lg:px-16">
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          Discover Your Next Event
        </h1>
        <p className="mb-6 text-lg text-white sm:text-xl lg:text-2xl">
          Explore exciting events happening near you!
        </p>
        <Link href="/events">
          <Button className="rounded-lg bg-purple-600 px-6 py-3 text-xl font-semibold text-white transition duration-300 hover:bg-purple-700">
            See Upcoming Events
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default Slider;
