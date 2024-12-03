import { useState } from "react";

import eventsService from "../services/events";

const EventForm = ({ events, setEvents }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const createEvent = (e) => {
    e.preventDefault();

    const eventObject = {
      name: name,
      description: description,
      date: date,
    };

    eventsService.createEvent(eventObject).then((createdEvent) => {
      setEvents(events.concat(createdEvent));
      setName("");
      setDescription("");
      setDate("");
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
    console.log(date);
  };

  return (
    <div className="flex flex-col mt-[1rem] gap-2">
      <h3 className="text-3xl underline text-center text-nowrap">Create an event</h3>
      <form
        onSubmit={createEvent}
        className="border border-black rounded-xl p-2 px-4 w-[15rem]"
      >
        <div className="">
          <p className="underline">Name</p>
          <input
            type="text"
            onChange={handleNameChange}
            className="w-full border border-black rounded pl-1"
          />
        </div>
        <div className="mt-2">
          <p className="underline">Description</p>
          <textarea
            onChange={handleDescriptionChange}
            className="border rounded border-black pl-1 w-full h-[10rem] resize-none"
          />
        </div>
        <div className="mt-2">
            <p className="underline">Date</p>
            <input type="date" onChange={handleDateChange} className="border border-black rounded pl-1 w-full"/>
        </div>
        <div>
          <button type="submit" className="border border-green-600 text-green-600 px-4 mt-4 rounded">Create</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
