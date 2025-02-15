// export const runtime = 'edge';
// import GlobalApi from "@/app/_utils/GlobalApi";
// import React from "react";
// import TopCategoryList from "../_components/TopCategoryList";
// import EventList from "@/app/_components/EventList";

// async function EventCategory({ params }) {
//   // Fetching event list by category and category list asynchronously
//   const eventList = await GlobalApi.getEventsByCategory(params.categoryName);  
//   const categoryList = await GlobalApi.getCategoryList(params.categoryName);


//   return (
//     <div>
//       <h1 className="p-4 bg-primary text-white font-bold text-xl text-center">
//         {params.categoryName}
//       </h1>
//       <TopCategoryList
//         categoryList={categoryList}
//         selectedCategory={params.categoryName}
//       />
//       <div className="p-5 md:p-10">
//         <EventList eventList={eventList} />
//       </div>
//     </div>
//   );
// }

// export default EventCategory;
