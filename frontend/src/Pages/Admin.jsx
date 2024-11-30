import { useState, useEffect } from "react";

import EventForm from "../components/EventForm";
import Events from "../components/Events";

import eventsService from "../services/events"

const Admin = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        eventsService
            .getAll()
            .then(initialEvents => {
                setEvents(initialEvents)  
            })
    }, []);

    return (
        <div className="">
            <h1 className="m-4 text-2xl italic">Admin Page</h1>
            <div className="flex justify-between w-[50rem] m-auto">
                <Events events={events}/>
                <EventForm events={events} setEvents={setEvents}/>
            </div>
        </div>
    );
}
 
export default Admin;