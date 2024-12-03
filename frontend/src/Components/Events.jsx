import Event from './Event';

const Events = ({ events, user }) => {
    return (
        <div className="flex flex-col items-center w-full mt-4 overflow-auto">
            <h2 className='text-3xl underline'>Events</h2>
            {user ? <p className="border border-yellow-400 text-yellow-600 px-4 mt-4 rounded py-1">Once you join an event you will not be allowed to unjoin.</p> : ''}
            <div className="flex flex-col gap-2 mt-[0.75rem] border border-black rounded-xl overflow-auto w-full p-4 scrollbar-none h-[20rem] shadow-xl">
            {events.map(event => (
                <Event key={event.id} event={event} user={user}/>
            ))}
            </div>
        </div>
    );
}
 
export default Events