import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import Header from "../components/Header";
import Welcome from "../components/Welcome";
import Events from "../components/Events";

import eventsService from "../services/events";

const Home = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    eventsService.getAll().then((initialEvents) => {
      setEvents(initialEvents);
    });
  }, []);

  return (
    <div className="m-auto max-w-[50rem]">
      <Header user={user} />
      <Welcome user={user} />
      <Events events={events} user={user}/>
      {!user ? (
        <div className="flex justify-center mt-[3rem]">
          <button className="border border-black px-4 rounded">
            Create account
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
