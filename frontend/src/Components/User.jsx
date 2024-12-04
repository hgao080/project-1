import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useState } from "react";
import Event from "./Event";

const User = ({ user, events }) => {
  const [showEvents, setShowEvents] = useState(false);
  const attendingEvents = events.filter((event) =>
    event.users.includes(user.username)
  );

  const handleClick = () => {
    setShowEvents(!showEvents);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center border border-black px-4 py-1 rounded-lg bg-pastel-orange text-2xl font-bold">
        <div className="flex flex-col">
          <p className="">Username: {user.username}</p>
          <p className="">Email: {user.email}</p>
        </div>
        <div
          className="border rounded-full border-black hover:cursor-pointer"
          onClick={handleClick}
        >
          {!showEvents ? (
            <RiArrowDropDownLine className="m-[-6px]" size={40} />
          ) : (
            <RiArrowDropUpLine className="m-[-6px]" size={40} />
          )}
        </div>
      </div>
      {!showEvents ? (
        ""
      ) : (
        <div className="border border-black border-t-0 mt-[-6px] py-2 px-4 rounded-b-lg text-2xl font-bold bg-pastel-orange">
          <h3 className="underline decoration-1">Events Attending</h3>

          <div className="grid grid-cols-4">
            {attendingEvents.length > 0 ? (
              attendingEvents.map((event) => (
                <div key={event.id} className="">
                  <p className="italic">{event.name}</p>
                </div>
              ))
            ) : (
              <div className="">User is not attending any events</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
