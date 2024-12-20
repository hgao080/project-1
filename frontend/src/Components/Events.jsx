import { useState } from "react";
import Event from "./Event";
import Filter from "./Filter";

const Events = ({ events, setEvents, user }) => {
  const [filter, setFilter] = useState("");

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const now = new Date();

    eventDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    return eventDate >= now;
  })

  const eventsToShow =
    filter.length === 0
      ? upcomingEvents
      : upcomingEvents.filter((event) =>
          event.name.toLowerCase().startsWith(filter.toLowerCase())
        );

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full mt-4">
      <h2 className="text-6xl underline font-main decoration-2 font-bold text-warm-brown underline-offset-4 tracking-wide">
        Events
      </h2>
      {user && !user.isAdmin ? (
        <p className="flex justify-center bg-golden-yellow border border-black w-full mt-4 rounded py-2 font-main font-bold text-2xl">
          Once you join an event you will not be allowed to unjoin.
        </p>
      ) : (
        ""
      )}
      {user ? (
        <div className="self-start mt-4">
          <Filter
            filter={filter}
            handleFilterChange={handleFilterChange}
          ></Filter>
        </div>
      ) : null}
      <div className="flex flex-col gap-3 mt-[0.75rem] border border-black rounded-xl overflow-auto w-full p-4 scrollbar-none h-[30rem] bg-beige shadow-2xl font-body">
        {eventsToShow.map((event) => (
          <Event
            key={event.id}
            event={event}
            events={events}
            setEvents={setEvents}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
