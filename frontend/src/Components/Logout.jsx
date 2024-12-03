import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'

const Logout = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <NavLink onClick={handleClick} to="/" className="border border-black px-4 rounded">
      Log out
    </NavLink>
  );
};

export default Logout;
