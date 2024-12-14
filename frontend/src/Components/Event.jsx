import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import userServices from "../services/user";
import SureCheck from "./SureCheck";

const Event = ({ event, events, setEvents, user }) => {
  const navigate = useNavigate()

  const [isJoined, setIsJoined] = useState(false);
  const [isSure, setIsSure] = useState(false);
  const [isCompLinked, setIsCompLinked] = useState(event.competitionId);

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

        setIsSure(false);
        setIsJoined(true);
      });
  };

  const handleStartComp = () => {
    navigate(`/competition/${event.competitionId}`)
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex border border-black w-full px-4 py-2 justify-between items-center rounded-xl bg-pastel-orange shadow-lg font-body">
      <div className="flex flex-col">
        <h3 className="flex font-bold text-2xl items-end gap-4">
          {event.name}{" "}
          <span className="text-xl italic font-normal underline decoration-1 mb-[2px]">
            {formattedDate}
          </span>
        </h3>
        <p className="text-xl">{event.description}</p>
      </div>

      <div className="flex items-center gap-4">
        {isCompLinked ? <button onClick={handleStartComp} className="border border-black px-4 rounded">Start Competition</button> : null}

        {!isSure ? (
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
          <SureCheck
            confirm={handleJoin}
            cancel={() => {
              setIsSure(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Event;
