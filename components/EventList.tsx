import React from 'react';
import EventCard from './EventCard';

interface Event {
  id: string;
  title: string;
  description?: string | null;
  date: Date;
  location: string;
  price: number;
  categoryId?: string | null;
  organiserId?: string | null;
  channelId?: string | null;
  createdAt?: Date | null;
  eventImage?: string
}

interface EventListProps {
  eventsList: Event[];
}

function EventList({ eventsList }: EventListProps) {
  return (
    <div className="mt-10">
      <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {/* {eventList.map((event, index) => index<12&&(
        <EventCard key={index}  event={event}/>
        ))}  * renders 12 events only as conditioned defined */}
       {eventsList.slice(0, 12).map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventList;
