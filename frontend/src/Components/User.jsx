const User = ({user}) => {
    return (
        <div className="flex flex-col border border-black px-4 py-1 rounded-lg">
            <p className="">Username: {user.username}</p>
            <p className="">Email: {user.email}</p>
        </div>
    );
}
 
export default User;