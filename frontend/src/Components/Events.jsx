import Event from './Event';

const Events = ({ events, user }) => {
    return (
        <div className="flex flex-col items-center mt-4 overflow-auto">
            <h2 className='text-3xl underline'>Events</h2>
            <div className="flex flex-col gap-2 mt-[0.75rem] border border-black rounded-xl overflow-auto w-full p-4 scrollbar-none h-[20rem]">
            {events.map(event => (
                <Event key={event.id} event={event} user={user}/>
            ))}
            </div>
        </div>
    );
}
 
export default Events