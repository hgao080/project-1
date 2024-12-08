import User from "./User";

const Users = ({ users, events }) => {
  return (
    <div className="mt-4 h-full">
      <h2 className="text-center text-5xl underline font-bold decoration-2 text-warm-brown tracking-wider underline-offset-2">Users</h2>
      <div className="flex flex-col gap-2 border border-black p-4 rounded-lg mt-4 h-[20rem] overflow-auto scrollbar-none shadow-2xl bg-beige font-body">
        {users
          .filter((user) => !user.isAdmin)
          .map((user) => (
            <User key={user.username} user={user} events={events}/>
          ))}
      </div>
    </div>
  );
};

export default Users;
