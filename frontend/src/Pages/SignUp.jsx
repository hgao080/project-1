import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const { user } = useAuthContext();

  if (user) {
    if (user.isAdmin) {
      return <Navigate to="/admin" />;
    }

    return <Navigate to="/" />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, username);
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="flex items-center m-auto border border-black rounded-lg h-[20rem]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col m-auto px-4 rounded-xl py-2 items-center w-[40rem]"
        >
          <h3 className="m-auto text-3xl underline">Sign up</h3>

          <div className="flex mt-4 w-[60%] m-auto gap-4 translate-x-[-2.5rem]">
            <div className="flex flex-col gap-2 items-end">
              <label htmlFor="email">Email</label>
              <label htmlFor="password">Password</label>
              <label htmlFor="username">Username</label>
            </div>

            <div className="flex flex-col w-full gap-2">
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border border-black rounded pl-2"
              />

              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-black rounded pl-2"
              />

              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                className="border border-black rounded pl-2"
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            className="border border-green-600 mt-4 px-4 rounded text-green-600"
          >
            Sign up
          </button>
          {error && <div className="">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
