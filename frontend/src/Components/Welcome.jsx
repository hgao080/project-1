const Welcome = ({ user }) => {
    return (
        <div className="flex justify-center">
            <h1 className="text-6xl font-main font-bold text-warm-brown text-center">{user ? `Welcome ${user.username}! Ready to join some events?` : 'Welcome to the Ultimate Maths & Physics Competition!'}</h1>
        </div>
    );
}
 
export default Welcome