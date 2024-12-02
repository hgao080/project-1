import eventServices from '../services/events'

const Event = ({ data, user }) => {
    
  const handleJoin = (e) => {
    e.preventDefault()

    const joiningUser = {
        username: user.username
    }

    eventServices
        .joinEvent(data.id, joiningUser)
        .then((event) => {
            console.log(event)
        })
  };

  return (
    <div className="flex border border-black w-[30rem] px-2 py-1 justify-between items-center">
      <div className="flex flex-col">
        <h3 className="font-bold">{data.name}</h3>
        <p className="italic mt-[-4px]">{data.date}</p>
        <p>{data.description}</p>
      </div>
      {user ? (
        <button
          onClick={handleJoin}
          className="border border-black px-2 rounded"
        >
          Join
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Event;
