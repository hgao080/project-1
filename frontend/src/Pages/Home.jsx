import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import Header from "../components/Header";
import Welcome from "../components/Welcome";
import Events from "../components/Events";

import eventsService from "../services/events";
import UserDetails from "../components/UserDetails";

const Home = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    eventsService.getAll().then((initialEvents) => {
      setEvents(initialEvents);
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-homeBg bg-no-repeat bg-center bg-cover">
      <div className="m-auto max-w-[60rem]">
        <Header user={user} />
        <Welcome user={user} />
        {!user ? (
          <div className="flex items-center justify-center border border-black bg-golden-yellow rounded-xl text-center py-2 mt-4 h-[4rem] shadow-xl font-main text-2xl font-bold tracking-wide">
            You are not logged in. Click Login to register for events
          </div>
        ) : (
          ""
        )}

        {!user ? (
          <Events events={events} user={user} />
        ) : (
          <div className="flex items-start gap-12">
            <Events events={events} user={user} />
            <UserDetails user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
