import { useState, useEffect, createContext } from "react";

import EventForm from "../components/EventForm";
import EventsAdmin from "../components/EventsAdmin";
import Logout from "../components/Logout";
import Users from "../components/Users";
import CompetitionsQuestions from "../components/CompetitionsQuestions";

import eventsService from "../services/events";
import usersService from "../services/user";
import competitionsService from "../services/competitions";

import { useAuthContext } from "../hooks/useAuthContext";

export const DataContext = createContext();

const Admin = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeout, setTimeoutReached] = useState(false);
  const [isCompetitionsDisplayed, setisCompetitionsDisplayed] = useState(false);
  const [markingResults, setMarkingResults] = useState({});
  const [isNoResults, setIsNoResults] = useState(false);

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

  const handleSwap = () => {
    setisCompetitionsDisplayed(!isCompetitionsDisplayed);
  };

  return (
    <div className="w-screen h-screen bg-homeBg bg-no-repeat bg-center bg-cover font-main pb-8">
      <div className="max-w-[60rem] flex justify-between items-center px-4 py-4 m-auto">
        <h1 className="text-5xl italic">Admin Page</h1>
        <div className="">
          <button
            onClick={handleSwap}
            className="text-xl px-4 py-1 border-black rounded-lg font-bold hover:underline"
          >
            {!isCompetitionsDisplayed ? "Competitions" : "Events"}
          </button>
        </div>
        <Logout />
      </div>

      <div className="flex">
        <DataContext.Provider
          value={{
            competitions,
            setCompetitions,
            setEvents,
            setMarkingResults,
            setIsNoResults
          }}
        >
          {!isCompetitionsDisplayed ? (
            <div className="flex gap-4 m-auto">
              <div className="flex flex-col">
                <div className="flex gap-4">
                  <div className="flex w-[50rem] h-[28rem]">
                    <EventsAdmin
                      events={events}
                      setEvents={setEvents}
                      user={user}
                    />
                  </div>
                  <EventForm events={events} setEvents={setEvents} />
                </div>

                <div className="">
                  <Users users={users} events={events} />
                </div>
              </div>
              {markingResults && Object.keys(markingResults).length > 0 ? (
                <div className="flex flex-col border border-black rounded-lg bg-beige p-2 w-[300px]">
                  <h3 className="underline font-bold text-2xl decoration-1 font-main">
                    Marking Results
                  </h3>
                  {Object.entries(markingResults).map(([key, result]) => (
                    <div key={key} className="grid grid-cols-2 text-xl">
                      <p className="">{key}</p>
                      <p className="justify-self-end">{result}</p>
                    </div>
                  ))}
                </div>
              ) : (isNoResults ? (
                <div className="flex flex-col border border-black rounded-lg bg-beige p-2 w-[300px]">
                  <h3 className="underline font-bold text-2xl decoration-1 font-main">
                    Marking Results
                  </h3>
                  <div className="text-xl">No results to show</div>
                </div>
              ) : null)}
            </div>
          ) : (
            <CompetitionsQuestions />
          )}
        </DataContext.Provider>
      </div>
    </div>
  );
};

export default Admin;
