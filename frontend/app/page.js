import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import EventList from "./_components/EventList";
import Footer from "./_components/Footer";

export default async function Home() {
  const sliderList = await GlobalApi.getSlider();
  console.log("slider lists data ;", sliderList);

  const categoryList = await GlobalApi.getCategoryList();
  const eventList = await GlobalApi.getAllEvent();

  // console.log(eventList);

  return (
    <>
      <div className=" md:pt-10 px-9 md:px-14">
        <Slider sliderList={sliderList} />
        <CategoryList categoryList={categoryList} />
        <EventList eventList={eventList} />
        <div className="">
          <Image
            src="/webBanner.png"
            alt="Banner"
            width={1000}
            height={300}
            className="w-full h-[180px] md:h-[400px] object-cover mt-4 md:mt-9 rounded-lg" // rounded-lg for larger border-radius
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
