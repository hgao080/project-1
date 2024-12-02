import { useState } from "react";
import userServices from '../services/user'
import { useAuthContext } from "../hooks/useAuthContext";

const UserDetails = ({ user }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [oldName, setOldName] = useState(user.username);
    const [newName, setNewName] = useState(user.username);
    const { dispatch } = useAuthContext()

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }

    const handleSave = () => {
        userServices.updateUser(user.username, {username: newName})
            .then(returnedUser => {
                dispatch({type: 'LOGIN', payload: {...user, username: returnedUser.username}})
                setOldName(returnedUser.username)
                toggleEdit()
            })
    }

    return (
        <div className="border border-black w-[12rem] p-2 rounded-xl">
            <h3>User details</h3>
            {isEdit ? (
                <p className="">Username: <input type="text" onChange={(e) => setNewName(e.target.value)} defaultValue={oldName}/></p>
            ) : <p>Username: {oldName}</p>}
            
            <p className="break-all">Email: {user.email}</p>

            {isEdit ? (
                <div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={toggleEdit}>Cancel</button>
                </div>
            ) : (
                <button onClick={toggleEdit}>Edit username</button>
            )}
        </div>
    );
}
 
export default UserDetails;