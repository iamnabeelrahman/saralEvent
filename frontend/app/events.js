import React from 'react'
import EventList from './_components/EventList'
import GlobalApi from "./_utils/GlobalApi";


async function  events() {
    const eventList = await GlobalApi.getAllEvent();

  return (
    <div>
                <EventList eventList={eventList} />

      
    </div>
  )
}

export default events
