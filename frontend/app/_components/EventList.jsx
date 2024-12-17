import React from 'react'
import EventCard from './EventCard'


function EventList({eventList}) {
    // console.log("eventlist data :", eventList);
    
  return (
    <div className='mt-10'>
      
      <div className='grid grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      gap-5 mt-5'>  
        {/* {eventList.map((event, index) => index<12&&(
        <EventCard key={index}  event={event}/>
        ))}  * renders 12 events only as conditioned defined */}
        {eventList.map((event, index) => {
          // console.log("Event ID inside map:", event.documentId:);  // Log ID directly here
          return <EventCard key={index} event={event} />;
})}

      </div> 
      
    </div>
  )
}

export default EventList
