const Welcome = ({ user }) => {
    return (
        <div className="flex justify-center">
            <h1 className="text-4xl">Welcome{user ? ` ${user.username}!` : '!'}</h1>
        </div>
    );
}
 
export default Welcome