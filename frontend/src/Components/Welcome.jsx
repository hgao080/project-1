const Welcome = ({ user }) => {
    return (
        <div className="flex justify-center">
            <h1 className="text-7xl font-main font-bold text-warm-brown text-center">{user ? `Welcome ${user.username}! Ready to join some cozy events?` : 'Discover cozy gatherings near you'}</h1>
        </div>
    );
}
 
export default Welcome