import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate, NavLink } from "react-router-dom";

const Login = () => {
  const { user } = useAuthContext();

  if (user) {
    if (user.isAdmin) {
      return <Navigate to="/admin" />;
    }

    return <Navigate to="/" />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
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
                className="border border-black rounded w-full pl-1"
              />
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-black rounded w-full pl-1"
              />
            </div>
          </div>

          <div className="flex gap-1 border border-black px-4 mt-4 rounded bg-golden-yellow shadow-xl text-xl">
            <p className="">Don't have an account?</p>
            <NavLink to="/signup" className={`underline decoration-1 font-bold`}>Create one here!</NavLink>
          </div>
          <button disabled={isLoading} className="mt-4 border border-black px-4 rounded bg-pastel-green text-xl hover:translate-y-[-2px] active:translate-y-[2px] transition-all font-bold">Log in</button>
          {error && <div className="border border-red-500 text-red-500 px-4 mt-4 rounded text-xl font-bold">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
