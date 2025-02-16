'use client';
import axios from 'axios';
import CategoryList from 'components/CategoryList';
import Slider from 'components/Slider';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const runtime = 'edge';

export default function Home() {
  const [sliderList, setSliderList] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await axios.get('/api/sliders');
        setSliderList(response.data); 
      } catch (error) {
        console.error('Error fetching slider data:', error);
      }
      // console.log("Helllo");
      
    };

    const fetchCategoryData = async () => {
      try {
        const response = await axios.get('/api/categories');
        // console.log("API response:", response.data.categoryList);  // Debugging line
        setCategoryList(response.data.categoryList);  // Set the categories data
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
      // console.log("Helllo");
    };

    fetchSliderData();
    fetchCategoryData();
  }, []);

  return (
    <>
<div className="px-4 md:px-14 md:pt-10">
  <Slider sliderList={sliderList} />
  <CategoryList categoryList={categoryList} />

  <div className="mt-4 md:mt-9">
    <Image
      src="/homebanner.png"
      alt="Banner"
      width={1000}
      height={400} // Adjust the height to a more suitable value for larger screens
      className="w-full h-auto md:h-[300px] object-cover rounded-lg" 
    />
  </div>
</div>

    </>
  );
}
