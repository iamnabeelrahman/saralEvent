'use client';
import axios from 'axios';
import CategoryList from 'components/CategoryList';
import Slider from 'components/Slider';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const runtime = 'edge';


export default function Home() {
  const [sliderList, setSliderList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchSliderData();
      await fetchCategoryData();
    };

    fetchData().catch((error) => console.error('Error fetching data:', error));
  }, []);

  const fetchSliderData = async () => {
    try {
      const response = await axios.get<{ success: boolean; sliderList: any[] }>('/api/sliders');
      setSliderList(response.data.sliderList);
    } catch (error) {
      console.error('Error fetching slider data:', error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get('/api/categories');
      if (response.data.success) {
        setCategoryList(response.data.categoryList); // Correct structure
      } else {
        console.error("Failed to fetch categories:", response.data.message);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };
  

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
