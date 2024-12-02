import { useState } from "react";

const UserDetails = ({ user }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [oldName, setOldName] = useState(user.username);
    const [newName, setNewName] = useState(user.username);

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }

    const handleSave = (e) => {
        setOldName(newName)
        toggleEdit()
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