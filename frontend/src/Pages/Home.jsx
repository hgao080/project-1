import { useState, useEffect } from "react";

import Header from "../components/Header";
import Welcome from "../components/Welcome";
import Events from "../components/Events";

import eventsService from "../services/events"

const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        eventsService
            .getAll()
            .then(initialEvents => {
                setEvents(initialEvents)  
            })
    }, []);

    return (
        <div className="m-auto max-w-[50rem]">
            <Header/>
            <Welcome/>
            <Events events={events}/>
            <div className="flex justify-center mt-[3rem]">
                <button className="border border-black px-4 rounded">Create account</button>
            </div>
        </div>
    );
}
 
export default Home;