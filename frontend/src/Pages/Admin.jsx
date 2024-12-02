import { useState, useEffect } from "react";

import EventForm from "../components/EventForm";
import Events from "../components/Events";

import eventsService from "../services/events";
import Logout from "../components/Logout";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Admin = () => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/" />
    }

  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventsService.getAll().then((initialEvents) => {
      setEvents(initialEvents);
    });
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center px-4 py-4">
        <h1 className="text-2xl italic">Admin Page</h1>
        <Logout className=""/>
      </div>

      <div className="flex justify-between w-[50rem] m-auto">
        <Events events={events} />
        <EventForm events={events} setEvents={setEvents} />
      </div>
    </div>
  );
};

export default Admin;
