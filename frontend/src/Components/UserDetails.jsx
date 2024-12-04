import { useState } from "react";
import userServices from "../services/user";
import { useAuthContext } from "../hooks/useAuthContext";

const UserDetails = ({ user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [oldName, setOldName] = useState(user.username);
  const [newName, setNewName] = useState(user.username);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const toggleEdit = () => {
    setError(null)
    setIsEdit(!isEdit);
  };

  const handleSave = () => {
    userServices
      .updateUser(user.username, { username: newName })
      .then((returnedUser) => {
        if ("error" in returnedUser) {
          setError(returnedUser.error);
        } else {
          dispatch({
            type: "LOGIN",
            payload: { ...user, username: returnedUser.username },
          });

          const storedUser = JSON.parse(localStorage.getItem("user"));
          storedUser.username = returnedUser.username;
          localStorage.setItem("user", JSON.stringify(storedUser));

          setOldName(returnedUser.username);
          toggleEdit();
        }
      });
  };

  return (
    <div className="font-main">
      <div className="border border-black p-4 rounded-xl w-[14rem] mt-[5.8rem] bg-beige py-2">
        <h3 className="text-3xl underline font-bold decoration-2">
          User details
        </h3>
        {isEdit ? (
          <div>
            <p className="underline text-2xl decoration-1">
              Username
              <input
                type="text"
                onChange={(e) => setNewName(e.target.value)}
                defaultValue={oldName}
                className="border border-black w-full pl-1 rounded"
              />
            </p>
          </div>
        ) : (
          <div>
            <p className="underline decoration-1 text-2xl">Username</p>
            <p className="text-2xl">{oldName}</p>
          </div>
        )}

        <p className="underline decoration-1 text-2xl">Email</p>
        <p className="text-xl">{user.email}</p>

        <div className="flex justify-end mt-4">
          {isEdit ? (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="border border-black bg-pastel-green px-4 rounded font-bold text-lg transition-all hover:translate-y-[-2px] active:translate-y-[2px] hover:cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={toggleEdit}
                className="border border-black px-4 rounded font-bold text-lg bg-warm-gray transition-all hover:translate-y-[-2px] active:translate-y-[2px] hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={toggleEdit}
              className="border border-black px-4 rounded bg-pastel-blue font-bold text-lg transition-all hover:translate-y-[-2px] active:translate-y-[2px] hover:cursor-pointer shadow-md"
            >
              Edit Username
            </button>
          )}
        </div>
      </div>
      {error && (
        <div className="border border-red-500 text-red-500 px-4 mt-4 rounded text-xl font-bold">
          {error}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
