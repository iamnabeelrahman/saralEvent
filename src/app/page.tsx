'use client';
// import { createCustomerWithCustomId, getCustomers } from '@/server/functions/customers';

import Slider from 'components/Slider';
import { useState } from 'react';

export const runtime = 'edge';

export default async function Home() {
  const [sliderList, setSliderList] = useState([])

  // either use server actions
  // const customers = await getCustomers();

  // or fetch the api
  // const response = await fetch(`http://localhost:3000/api`);
  // const customers = (await response.json()).result; // <-- you will have to work with types quite a bit

  const getSlider = () => {
    console.log("Getting slider");
    
  }

  return (
    <>
      <div className="px-9 md:px-14 md:pt-10">
        <Slider sliderList= {sliderList} />
      </div>
    </>
  );
}
