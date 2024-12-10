import React from 'react'
import EventCard from './EventCard'


function EventList({eventList}) {
    // console.log("eventlist data :", eventList);
    
  return (
    <div className='mt-10'>
        {/* <h2 className="text-purple-600 font-extrabold text-1xl md:text-2xl text-center">
        Events 
      </h2> */}
      <div className='grid grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      gap-5 mt-5'>  
        {eventList.map((event, index) => index<12&&(
        <EventCard key={index}  event={event}/>
        ))}  {/** renders 12 events only as conditioned defined */}
      </div> 
      
    </div>
  )
}

export default EventList
