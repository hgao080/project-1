import { useState, useEffect, createContext } from "react";

import EventForm from "../components/EventForm";
import EventsAdmin from "../components/EventsAdmin";

import eventsService from "../services/events";
import usersService from "../services/user";
import competitionsService from "../services/competitions";
import Logout from "../components/Logout";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Users from "../components/Users";
import Competitions from "../components/Competitions";

export const DataContext = createContext();

const Admin = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeout, setTimeoutReached] = useState(false);

  useEffect(() => {
    if (user) {
      eventsService.getAll().then((initialEvents) => {
        setEvents(initialEvents);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      usersService
        .getUsers({ Authorization: `Bearer ${user.token}` })
        .then((users) => {
          setUsers(users);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      competitionsService.getAll().then((initialCompetitions) => {
        setCompetitions(initialCompetitions);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 1000);

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
    <div className="w-screen bg-homeBg bg-no-repeat bg-center bg-cover font-main pb-8">
      <div className="max-w-[60rem] m-auto">
        <div className="flex justify-between items-center px-4 py-4">
          <h1 className="text-5xl italic">Admin Page</h1>
          <Logout />
        </div>

        <div className="flex justify-center mt-[-1rem] gap-8 ">
          <DataContext.Provider value={{competitions, setEvents}}>
            <div className="flex flex-col">
              <div className="flex gap-4">
                <div className="flex w-[50rem] h-[28rem] m-auto">
                  <EventsAdmin
                    events={events}
                    setEvents={setEvents}
                    user={user}
                  />
                </div>
                <EventForm events={events} setEvents={setEvents} />
              </div>

              <div className="">
                <div className="">
                  <Competitions
                    competitions={competitions}
                    setCompetitions={setCompetitions}
                  />
                </div>
              </div>
            </div>
          </DataContext.Provider>

          <div className="">
            <Users users={users} events={events} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
