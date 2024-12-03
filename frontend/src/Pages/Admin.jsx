import { useState, useEffect } from "react";

import EventForm from "../components/EventForm";
import Events from "../components/Events";

import eventsService from "../services/events";
import usersService from '../services/user'
import Logout from "../components/Logout";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Users from "../components/Users";

const Admin = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeout, setTimeoutReached] = useState(false);

  useEffect(() => {
    eventsService.getAll().then((initialEvents) => {
      setEvents(initialEvents);
    });
    usersService.getUsers().then(users => {
      setUsers(users);
    })
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 1000); // 10 seconds timeout

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    if (timeout) {
      return <Navigate to="/" />;
    }
    return <div>Loading...</div>;
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-screen h-screen">
      <div className="max-w-[60rem] m-auto">
        <div className="flex justify-between items-center px-4 py-4">
          <h1 className="text-2xl italic">Admin Page</h1>
          <Logout/>
        </div>

        <div className="flex gap-4 items-start">
          <div className="flex justify-between w-[50rem] m-auto shadow-2xl">
            <Events events={events} />
          </div>
          <EventForm events={events} setEvents={setEvents} />
        </div>

        <div className="">
          <Users users={users} events={events}/>
        </div>
      </div>
    </div>
  );
};

export default Admin;
