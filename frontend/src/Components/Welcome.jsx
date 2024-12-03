const Welcome = ({ user }) => {
    return (
        <div className="flex justify-center">
            <h1 className="text-8xl font-main font-bold text-warm-brown">Welcome{user ? ` ${user.username}!` : '!'}</h1>
        </div>
    );
}
 
export default Welcome