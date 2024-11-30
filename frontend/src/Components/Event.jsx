const Event = ({ data }) => {
    return (
        <div className="flex flex-col w-[30rem] border border-black rounded-xl px-2 py-1">
            <h3 className="font-bold">{data.name}</h3>
            <p className="italic mt-[-4px]">{data.date}</p>
            <p>{data.description}</p>
        </div>
    );
}
 
export default Event;