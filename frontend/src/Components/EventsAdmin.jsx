import { useState } from "react";
import EventAdmin from "./EventAdmin";
import Filter from "./Filter";

const EventsAdmin = ({ events, setEvents, user }) => {
  const [searchFilter, setFilter] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [eventFilter, setEventFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const now = new Date();

    eventDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    if (eventFilter === "old") {
      return eventDate < now;
    } else if (eventFilter === "upcoming") {
      return eventDate >= now;
    }
    return true;
  });

  const eventsToShow =
    searchFilter.length === 0
      ? filteredEvents
      : filteredEvents.filter((event) =>
          event.name.toLowerCase().startsWith(searchFilter.toLowerCase())
        );

  const sortedEvents = [...eventsToShow].sort((a, b) => {
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === "date") {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleEventFilterChange = (e) => {
    setEventFilter(e.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full mt-4">
      <h2 className="text-6xl underline font-main decoration-2 font-bold text-warm-brown underline-offset-4 tracking-wide">
        Events
      </h2>
      <div className="flex gap-4 mt-4 self-start">
        <Filter
          filter={searchFilter}
          handleFilterChange={handleFilterChange}
        ></Filter>
        <div className="text-2xl">
          <label htmlFor="sort" className="font-bold">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortCriteria}
            onChange={handleSortChange}
            className="w-[4rem]"
          >
            <option value="name">Name</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="text-2xl">
          <label htmlFor="eventFilter" className="font-bold">
            Show:
          </label>
          <select
            id="eventFilter"
            value={eventFilter}
            onChange={handleEventFilterChange}
            className="w-[8rem]"
          >
            <option value="all">All</option>
            <option value="old">Old Events</option>
            <option value="upcoming">Upcoming Events</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-[0.75rem] border border-black rounded-xl overflow-auto w-full p-4 scrollbar-none h-[30rem] bg-beige shadow-2xl">
        {sortedEvents.map((event) => (
          <EventAdmin
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

export default EventsAdmin;
