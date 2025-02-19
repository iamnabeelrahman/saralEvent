
import React from "react";
// import TopCategoryList from "../_components/TopCategoryList";
// import EventList from "components/EventList";

export const runtime = 'edge';


interface EventCategoryPrps {
  params: {
    categoryName: string;
  };
}
async function EventCategory({ params }:EventCategoryPrps) {
  // Fetching event list by category and category list asynchronously


  return (
    <div>
      <h1 className="p-4 bg-primary text-white font-bold text-xl text-center">
        {params.categoryName}
      </h1>
      {/* <TopCategoryList
        categoryList={categoryList}
        selectedCategory={params.categoryName}
      /> */}
      <div className="p-5 md:p-10">
        {/* <EventList eventList={eventList} /> */}
        Hi hello
      </div>
    </div>
  );
}

export default EventCategory;
