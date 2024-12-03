import { useEffect, useState } from "react";

import eventServices from "../services/events";

const Event = ({ event, user }) => {
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (user && event.users.includes(user.username)) {
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

  return (
    <div className="flex border border-black w-full px-4 py-2 justify-between items-center rounded-xl bg-pastel-orange font-main shadow-lg">
      <div className="flex flex-col">
        <h3 className="font-bold text-3xl">{event.name}</h3>
        <p className="italic mt-[-6px] text-2xl">{event.date}</p>
        <p className="text-xl tracking-wide font-bold">{event.description}</p>
      </div>
      {user ? (
        <button
          onClick={handleJoin}
          className="border border-black px-2 rounded"
          disabled={isJoined}
        >
          {isJoined ? 'Joined' : 'Join'}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Event;
