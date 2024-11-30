import { useState } from "react";

import eventsService from "../services/events"

const EventForm = ({events, setEvents}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const createEvent = (e) => {
        e.preventDefault()

        const eventObject = {
            name: name,
            description: description,
            date: date
        }

        eventsService
            .createEvent(eventObject)
            .then((createdEvent) => {
                setEvents(events.concat(createdEvent))
                setName('')
                setDescription('')
                setDate('')
            })
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handleDateChange = (e) => {
        setDate(e.target.value)
        console.log(date);
    }

    return (
        <form onSubmit={createEvent} className="border border-black rounded-xl">
            <div className="">
                name <input type="text" onChange={handleNameChange}/>             
            </div>
            <div className="">
                description <input type="text" onChange={handleDescriptionChange}/> 
            </div>
            <div className="">
                date <input type="date" onChange={handleDateChange}/> 
            </div>
            <div>
                <button type="submit">create</button>
            </div>
        </form>
    );
}
 
export default EventForm;