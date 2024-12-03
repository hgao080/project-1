import User from "./User";

const Users = ({ users }) => {
  return (
    <div className="mt-4 h-full">
      <h2 className="text-center text-3xl underline">Users</h2>
      <div className="flex flex-col gap-2 border border-black p-4 rounded-lg mt-4 h-[20rem] overflow-auto scrollbar-none">
        {users
          .filter((user) => !user.isAdmin)
          .map((user) => (
            <User user={user} />
          ))}
      </div>
    </div>
  );
};

export default Users;
