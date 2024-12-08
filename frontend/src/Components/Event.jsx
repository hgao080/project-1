import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import userServices from "../services/user";
import eventServices from "../services/events";
import SureCheck from "./SureCheck";

const Event = ({ event, events, setEvents, user }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isSure, setIsSure] = useState(false);

  useEffect(() => {
    if (user && user.joinedEvents.includes(event.name)) {
      setIsJoined(true);
    }
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    userServices
      .updateJoinedEvents(user.username, { eventName: event.name })
      .then((returnedUser) => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        storedUser.joinedEvents = returnedUser.joinedEvents;
        localStorage.setItem("user", JSON.stringify(storedUser));

        setIsSure(false)
        setIsJoined(true);
      });
  };

  const handleDelete = () => {
    eventServices.deleteEvent(event.id).then(() => {
      setEvents(
        events.filter((existingEvent) => existingEvent.id !== event.id)
      );
    });
  };

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex border border-black w-full px-4 py-2 justify-between items-center rounded-xl bg-pastel-orange shadow-lg font-body">
      <div className="flex flex-col">
        <h3 className="flex font-bold text-2xl items-end gap-4">{event.name} <span className="text-xl italic font-normal underline decoration-1 mb-[2px]">{formattedDate}</span></h3>
        <p className="text-xl">{event.description}</p>
      </div>
      {user && !user.isAdmin ? (
        !isSure ? (
          <button
            onClick={() => {
              setIsSure(true);
            }}
            className={`border border-black py-1 rounded bg-pastel-blue font-bold disabled:opacity-50 disabled:border-gray-800 w-[3.5rem] transition-all active:translate-y-[2px] shadow-lg ${
              isJoined ? "" : " hover:translate-y-[-2px] hover:cursor-pointer"
            }`}
            disabled={isJoined}
          >
            {isJoined ? "Joined" : "Join"}
          </button>
        ) : (
          <SureCheck confirm={handleJoin} cancel={() => {setIsSure(false)}}/>
        )
      ) : user && user.isAdmin ? ( !isSure ? (
        <button
          onClick={() => {setIsSure(true)}}
          className="text-red-400 border rounded-full p-2 border-red-400 transition-all hover:translate-y-[-2px] active:translate-y-[2px] hover:cursor-pointer"
        >
          <FaTrash />
        </button>
      ) : (
        <SureCheck confirm={handleDelete} cancel={() => {setIsSure(false)}}/>
      )
      ) : null}
    </div>
  );
};

export default Event;
