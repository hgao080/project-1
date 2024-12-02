import { useLogout } from '../hooks/useLogout'

const Logout = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <button onClick={handleClick} className="border border-black px-4 rounded">
      Log out
    </button>
  );
};

export default Logout;
