import CategoryList from "@/app/_components/CategoryList";
import EventList from "@/app/_components/EventList";
import GlobalApi from "@/app/_utils/GlobalApi";
import React from "react";

async function page() {
  const categoryList = await GlobalApi.getCategoryList();

  const eventList = await GlobalApi.getAllEvent();

  return (
    <div>
      <CategoryList categoryList={categoryList} />
      <EventList eventList={eventList} />
    </div>
  );
}

export default page;
