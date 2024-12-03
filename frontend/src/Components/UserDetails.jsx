import { useState } from "react";
import userServices from "../services/user";
import { useAuthContext } from "../hooks/useAuthContext";

const UserDetails = ({ user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [oldName, setOldName] = useState(user.username);
  const [newName, setNewName] = useState(user.username);
  const { dispatch } = useAuthContext();

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = () => {
    userServices
      .updateUser(user.username, { username: newName })
      .then((returnedUser) => {
        dispatch({
          type: "LOGIN",
          payload: { ...user, username: returnedUser.username },
        });

        const storedUser = JSON.parse(localStorage.getItem('user'))
        storedUser.username = returnedUser.username
        localStorage.setItem('user', JSON.stringify(storedUser))

        setOldName(returnedUser.username);
        toggleEdit();
      });
  };

  return (
    <div className="border border-black p-2 rounded-xl w-[14rem] mt-[3.9rem]">
      <h3 className="text-[1.1rem] underline font-semibold">User details</h3>
      {isEdit ? (
        <div>
          <p className="underline">
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
          <p className="underline">Username</p>
          <p className="">{oldName}</p>
        </div>
      )}

      <p className="underline">Email</p>
      <p className="">{user.email}</p>

      <div className="flex justify-end mt-4">
        {isEdit ? (
          <div className="flex gap-2">
            <button onClick={handleSave} className="border border-green-600 px-2 rounded">Save</button>
            <button onClick={toggleEdit} className="border border-gray-400 px-2 rounded">Cancel</button>
          </div>
        ) : (
            <button
              onClick={toggleEdit}
              className="border border-black px-2 rounded"
            >
              Edit Username
            </button>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
