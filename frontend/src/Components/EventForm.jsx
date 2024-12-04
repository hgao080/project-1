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
      <h3 className="text-4xl underline text-center text-nowrap decoration-2 tracking-wide text-warm-brown font-bold">Create an event</h3>
      <form
        onSubmit={createEvent}
        className="border border-black rounded-xl p-2 px-4 w-[15rem] shadow-2xl bg-beige"
      >
        <div className="">
          <p className="underline font-bold text-xl tracking-wide">Name</p>
          <input
            type="text"
            onChange={handleNameChange}
            className="w-full border border-black rounded pl-1 text-xl font-bold"
            value={name}
          />
        </div>
        <div className="mt-2">
          <p className="underline font-bold text-xl tracking-wide">Description</p>
          <textarea
            onChange={handleDescriptionChange}
            className="border rounded border-black pl-1 w-full h-[10rem] resize-none text-xl font-bold"
            value={description}
          />
        </div>
        <div className="mt-2">
            <p className="underline font-bold text-xl tracking-wide">Date</p>
            <input type="date" onChange={handleDateChange} className="border border-black rounded pl-1 w-full text-xl font-bold" value={date}/>
        </div>
        <div>
          <button type="submit" className="border border-black text-black px-4 mt-4 rounded bg-pastel-green transition-all hover:translate-y-[-2px] active:translate-y-[2px] font-bold text-xl">Create</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
