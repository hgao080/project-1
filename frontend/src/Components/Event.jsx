import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import eventServices from "../services/events";

const Event = ({ event, events, setEvents, user }) => {
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (user && user.joinedEvents.includes(event.name)) {
        setIsJoined(true)
    }
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();

    const joiningUser = {
      username: user.username,
    };

    eventServices.joinEvent(event.id, joiningUser).then((event) => {
      setIsJoined(true)
    });
  };

  const handleDelete = () => {
    eventServices.deleteEvent(event.id).then(() => {
      setEvents(events.filter(existingEvent => existingEvent.id !== event.id));
    })
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex border border-black w-full px-4 py-2 justify-between items-center rounded-xl bg-pastel-orange font-main shadow-lg">
      <div className="flex flex-col">
        <h3 className="font-bold text-3xl">{event.name}</h3>
        <p className="italic mt-[-6px] text-2xl">{formattedDate}</p>
        <p className="text-xl tracking-wide font-bold">{event.description}</p>
      </div>
      {(user && !user.isAdmin) ? (
        <button
          onClick={handleJoin}
          className={`border border-black py-1 rounded bg-pastel-blue font-bold disabled:opacity-50 disabled:border-gray-800 w-[3.5rem] transition-all active:translate-y-[2px] shadow-lg ${isJoined ? '' : ' hover:translate-y-[-2px] hover:cursor-pointer'}`}
          disabled={isJoined}
        >
          {isJoined ? 'Joined' : 'Join'}
        </button>
      ) : user && user.isAdmin ? (
        <button onClick={handleDelete} className="text-red-400 border rounded-full p-2 border-red-400 transition-all hover:translate-y-[-2px] active:translate-y-[2px] hover:cursor-pointer">
          <FaTrash />
        </button>
      ) : null}
    </div>
  );
};

export default Event;
