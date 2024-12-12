import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import userServices from '../services/user'

const SignUp = () => {
  const { user, dispatch } = useAuthContext();

  if (user) {
    if (user.isAdmin) {
      return <Navigate to="/admin" />;
    }

    return <Navigate to="/" />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
      username,
      isAdmin: false,
      joinedEvents: []
    }

    userServices.signupUser(newUser).then(createdUser => {
      if ("error" in createdUser) {
        setError(createdUser.error);
      } else {
        localStorage.setItem('user', JSON.stringify(createdUser))

        dispatch({type: 'LOGIN', payload: createdUser})
      }
    })
  };

  return (
    <div className="flex h-screen w-screen bg-homeBg bg-no-repeat bg-center bg-cover font-main">
      <div className="flex items-center m-auto border border-black rounded-lg bg-beige">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col m-auto px-4 rounded-xl py-20 items-center w-[40rem]"
        >
          <h3 className="m-auto text-6xl underline font-bold decoration-2 underline-offset-2">
            Sign up
          </h3>

          <div className="flex mt-4 w-[60%] m-auto gap-4 translate-x-[-2.8rem]  tracking-wide text-2xl">
            <div className="flex flex-col gap-2 items-end font-bold">
              <label htmlFor="username">Username</label>
              <label htmlFor="email">Email</label>
              <label htmlFor="password">Password</label>
            </div>

            <div className="flex flex-col w-full gap-2 font-normal">
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                className="border border-black rounded pl-2 font-body"
              />
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border border-black rounded pl-2 font-body"
              />

              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-black rounded pl-2 font-body"
              />
            </div>
          </div>

          <div className="border border-black px-4 py-2 mt-4 rounded text-xl bg-golden-yellow shadow-xl">
            <p className="font-bold text-2xl">Password must contain at least:</p>
            <ul className="grid grid-cols-2 gap-x-4 list-disc ml-4 text-2xl decoration-3">
              <li>One capital letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
            </ul>
          </div>

          <button
            className="block border border-black bg-pastel-green mt-4 px-4 rounded transition-all shadow-lg text-xl hover:translate-y-[-2px] active:translate-y-[2px] font-bold"
          >
            Sign up
          </button>
          {error && (
            <div className="border border-red-500 text-red-500 px-4 mt-4 rounded text-xl font-bold">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
