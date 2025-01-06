import { useEffect, useState, useContext } from "react";
import { FaTrash } from "react-icons/fa";

import eventServices from "../services/events";
import SureCheck from "./SureCheck";

import { DataContext } from "../pages/Admin";

const EventAdmin = ({ event, events, setEvents, user }) => {
  const { competitions, setMarkingResults, setIsNoResults } = useContext(DataContext);

  const [isSure, setIsSure] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(
    competitions.length > 0 ? competitions[0].title : ""
  );
  const [linkedCompetition, setLinkedCompetition] = useState(
    event.competitionId
  );

  useEffect(() => {
    if (user && user.joinedEvents.includes(event.name)) {
      setIsJoined(true);
    }
  }, []);

  const handleDelete = () => {
    eventServices.deleteEvent(event.id).then(() => {
      setEvents(
        events.filter((existingEvent) => existingEvent.id !== event.id)
      );
    });
  };

  const addCompetition = (e) => {
    e.preventDefault();

    const data = {
      competitionId: selectedCompetition,
    };

    eventServices.addCompetition(event.id, data).then((returnedEvent) => {
      setEvents((events) => {
        return events.map((event) =>
          event.id === returnedEvent.title ? returnedEvent : event
        );
      });
      setLinkedCompetition(returnedEvent.competitionId);
    });
  };

  const handleMark = (e) => {
    eventServices.markEvent(event.id).then((results) => {
      setIsNoResults(false);
      setMarkingResults(results);

      if (Object.keys(results).length == 0) {
        setIsNoResults(true);
      }
    })
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex border border-black w-full px-4 py-2 justify-between items-center rounded-xl bg-pastel-orange shadow-lg font-body">
      <div className="flex flex-col">
        <h3 className="flex font-bold text-2xl gap-4 items-center">
          {event.name}{" "}
          <span className="text-xl italic font-normal underline decoration-1 mb-[2px]">
            {formattedDate}
          </span>
          {!event.competitionId ? null : (
            <button
              onClick={handleMark}
              className="inline font-normal border border-black px-4 rounded-lg text-sm"
            >
              Mark Event
            </button>
          )}
        </h3>
        <p className="text-xl">{event.description}</p>
      </div>

      <div className="flex items-center gap-4">
        {!linkedCompetition ? (
          <form onSubmit={addCompetition} className="flex gap-2">
            <select onChange={(e) => setSelectedCompetition(e.target.value)}>
              {competitions &&
                competitions.map((competition) => (
                  <option key={competition.title} value={competition.title}>
                    {competition.title}
                  </option>
                ))}
            </select>
            <button className="border border-black px-2 font-body rounded">
              Add Competition
            </button>
          </form>
        ) : (
          <div>
            <p className="">Associated Competition</p>
            <p className="">{linkedCompetition}</p>
          </div>
        )}
        {!isSure ? (
          <button
            onClick={() => {
              setIsSure(true);
            }}
            className="text-red-400 border rounded-full p-2 border-red-400 transition-all hover:translate-y-[-2px] active:translate-y-[2px] hover:cursor-pointer"
          >
            <FaTrash />
          </button>
        ) : (
          <SureCheck
            confirm={handleDelete}
            cancel={() => {
              setIsSure(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EventAdmin;
