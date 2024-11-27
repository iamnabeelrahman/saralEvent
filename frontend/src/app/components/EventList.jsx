import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events }) => {
  // Fallback for undefined or null events
  const safeEvents = events || [];

  return (
    <div id="event-list" className="row">
      {safeEvents.length === 0 ? (
        <p className="text-center">No events found</p>
      ) : (
        safeEvents.map((event) => <EventCard key={event.id} event={event} />)
      )}
    </div>
  );
};

export default EventList;
