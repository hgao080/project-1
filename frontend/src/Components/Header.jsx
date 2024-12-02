import { NavLink } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Header = ({ user }) => {
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }

    return (
        <header className="flex justify-end p-4">
            {user ? (
                <div>
                <button onClick={handleClick} className='border border-black px-4 rounded'>Log out</button>
            </div>
            ) : ''}
            
            {!user ? (
                <NavLink to="login" className="border border-black px-4 rounded">Log In</NavLink>
            ) : ''}
            
        </header>
    );
}
 
export default Header;