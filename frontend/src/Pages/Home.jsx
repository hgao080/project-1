import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import Header from "../components/Header";
import Welcome from "../components/Welcome";
import Events from "../components/Events";

import eventsService from "../services/events";
import UserDetails from "../components/UserDetails";
import { NavLink } from "react-router-dom";

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
      {!user ? (
        <Events events={events} user={user}/>
      ) : (
        <div className="flex gap-12 mt-12">
            <Events events={events} user={user}/>
            <UserDetails user={user}/>
        </div>
      )}
      
      {!user ? (
        <div className="flex justify-center mt-[3rem]">
          <NavLink className="border border-black px-4 rounded" to="/signup">
            Create account
          </NavLink>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
