import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header className="flex justify-end p-4">
            <NavLink to="login" className="border border-black px-4 rounded">Log In</NavLink>
        </header>
    );
}
 
export default Header;