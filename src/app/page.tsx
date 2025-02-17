'use client';
import axios from 'axios';
import CategoryList from 'components/CategoryList';
import EventList from 'components/EventList';
import Footer from 'components/Footer';
import Slider from 'components/Slider';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const runtime = 'edge';

// Define types for API responses
interface SliderType {
  id: number;
  imageUrl: string;
  icon: string;
  title: string;
}

interface CategoryType {
  id: number;
  name: string;
  imageUrl: string;
  icon: string; // Add the missing icon property
}

interface SliderResponse {
  success: boolean;
  sliderList: SliderType[];
}

interface EventType {
  id: string;
  title: string;
  eventImage?: string;
  description: string;
  date: Date; // Unix timestamp
  location: string;
  price: number;
  categoryId?: string;
  organiserId?: string;
  channelId?: string;
  createdAt?: Date | null; // Unix timestamp
}

interface CategoryResponse {
  success: boolean;
  categoryList: CategoryType[];
  message?: string;
}

interface EventResponse {
  success: boolean;
  eventList: EventType[];
  message?: string;
}


export default function Home() {
  const [sliderList, setSliderList] = useState<SliderType[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [eventsList, setEventsList] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchSliderData();
      await fetchCategoryData();
      await fetchEventsData()
    };

    fetchData().catch((error) => console.error('Error fetching data:', error));
  }, []);

  const fetchSliderData = async () => {
    try {
      const response = await axios.get<SliderResponse>('/api/sliders');
      setSliderList(response.data.sliderList);
    } catch (error) {
      console.error('Error fetching slider data:', error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get<CategoryResponse>('/api/categories');

      if (response.data.success) {
        setCategoryList(response.data.categoryList);
      } else {
        console.error('Failed to fetch categories:', response.data.message ?? 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const fetchEventsData = async () => {
    try {
      const response = await axios.get<EventResponse>('/api/events');
      if (response.data.success) {
        const formattedEvents = response.data.eventList.map(event => ({
          ...event,
          date: new Date(event.date), // Convert string to Date object
          createdAt: event.createdAt ? new Date(event.createdAt) : null
        }));
        setEventsList(formattedEvents);
        console.log('Events Data: ', formattedEvents);
        
      } else {
        console.error("Failed to fetch events:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  

  return (
    <>
    <div className="px-4 md:px-14 md:pt-10">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <EventList eventsList={eventsList} />

      <div className="mt-4 md:mt-9">
        <Image
          src="/homebanner.png"
          alt="Banner"
          width={1000}
          height={400}
          className="w-full h-auto md:h-[300px] object-cover rounded-lg"
        />
      </div>
    </div>
    <Footer/>
    </>
  );
}
