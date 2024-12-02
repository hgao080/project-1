import Event from './Event';

const Events = ({ events, user }) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className='text-3xl underline'>Events</h2>
            <div className="flex flex-col gap-2 mt-[1rem]">
            {events.map(event => (
                <Event key={event.id} event={event} user={user}/>
            ))}
            </div>
        </div>
    );
}
 
export default Events