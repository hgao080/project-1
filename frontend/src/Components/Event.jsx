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
    <div className="flex border border-black w-[30rem] px-2 py-1 justify-between items-center rounded-xl">
      <div className="flex flex-col">
        <h3 className="font-bold">{event.name}</h3>
        <p className="italic mt-[-4px]">{event.date}</p>
        <p>{event.description}</p>
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
