import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Logout = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
      <NavLink onClick={handleClick} to="/" className={`block bg-pastel-blue px-4 py-[0.2rem] rounded font-main text-lg tracking-wider font-bold border border-black transition-all hover:translate-y-[-2px] active:translate-y-[2px] hover:cursor-pointer shadow-xl`}>
        Log out
      </NavLink>
  );
};

export default Logout;
