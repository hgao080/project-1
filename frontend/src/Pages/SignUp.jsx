import { useState } from 'react'

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password, username);

    }

    return (
        <form onSubmit={handleSubmit} className="">
            <h3>Sign up</h3>

            <label htmlFor="">Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="">Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>

            <label htmlFor="">Username:</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)}/>

            <button>Sign up</button>
        </form>
    );
}
 
export default SignUp;