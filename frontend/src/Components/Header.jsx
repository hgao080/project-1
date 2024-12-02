import { NavLink } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Header = () => {
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }

    return (
        <header className="flex justify-end p-4">
            <div>
                <button onClick={handleClick}>Log out</button>
            </div>
            <NavLink to="login" className="border border-black px-4 rounded">Log In</NavLink>
        </header>
    );
}
 
export default Header;