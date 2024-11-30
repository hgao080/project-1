import { useState, useEffect } from 'react';

import Event from './Event';

import eventsService from '../services/events'

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        eventsService
            .getAll()
            .then(initialEvents => {
                setEvents(initialEvents)  
            })
    }, []);


    return (
        <div className="flex flex-col justify-center items-center mt-[2rem]">
            <h2 className='text-3xl underline'>Events</h2>
            <div className="flex flex-col gap-2 mt-[1rem]">
            {events.map(event => (
                <Event key={event.id} data={event}/>
            ))}
            </div>
        </div>
    );
}
 
export default Events