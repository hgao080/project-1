import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate, NavLink } from "react-router-dom";
import userServices from '../services/user'

const Login = () => {
  const { user, dispatch } = useAuthContext();

  if (user) {
    if (user.isAdmin) {
      return <Navigate to="/admin" />;
    }

    return <Navigate to="/" />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    }

    userServices.loginUser(user).then(loggedUser => {
      if ("error" in loggedUser) {
        setError(loggedUser.error);
      } else {
        localStorage.setItem('user', JSON.stringify(loggedUser))

        dispatch({type: 'LOGIN', payload: loggedUser})
      }
    }) 
  };

  return (
    <div className="flex w-screen h-screen bg-homeBg bg-no-repeat bg-center bg-cover font-main">
      <div className="flex border border-black m-auto py-20 w-[40rem] justify-center items-center rounded-lg bg-beige">
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <h3 className="m-auto text-6xl underline decoration-2 underline-offset-2">Login</h3>

          <div className="flex gap-2 translate-x-[-2.4rem] mt-4 w-[60%] text-2xl tracking-wide">
            <div className="flex flex-col items-end gap-2">
              <label htmlFor="email">Email</label>
              <label htmlFor="password">Password</label>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border border-black rounded w-full pl-1 font-body"
              />
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-black rounded w-full pl-1 font-body"
              />
            </div>
          </div>

          <div className="flex gap-1 border border-black px-4 mt-4 rounded bg-golden-yellow shadow-xl text-2xl">
            <p className="">Don't have an account?</p>
            <NavLink to="/signup" className={`underline decoration-1 font-bold  transition-all hover:translate-y-[-1px] active:translate-y-[1px]`}>Create one here!</NavLink>
          </div>
          <button className="mt-4 border border-black px-4 rounded bg-pastel-green text-xl hover:translate-y-[-2px] active:translate-y-[2px] transition-all font-bold">Log in</button>
          {error && <div className="border border-red-500 text-red-500 px-4 mt-4 rounded text-xl font-bold">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
