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
        <div className="flex flex-row-reverse gap-4 items-center">
          <div className="bg-pastel-blue px-4 py-[0.2rem] rounded font-main text-lg tracking-wider font-bold border border-black transition-all hover:translate-y-[-2px] active:translate-y-[2px] hover:cursor-pointer shadow-xl">
            <NavLink to="login">Login</NavLink>
          </div>
          <div className="bg-pastel-green px-4 py-[0.2rem] rounded font-main text-lg tracking-wider font-bold border border-black transition-all hover:translate-y-[-2px] active:translate-y-[2px] hover:cursor-pointer shadow-xl">
            <NavLink to="signup">Signup</NavLink>
          </div>
        </div>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
