import { NavLink } from "react-router-dom";
import Logout from "./Logout";

const Header = ({ user }) => {
  return (
    <header className="flex justify-end p-4">
      {user ? (
        <div>
          <Logout />
        </div>
      ) : (
        ""
      )}

      {!user ? (
        <NavLink to="login" className="border border-black px-4 rounded">
          Log In
        </NavLink>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
