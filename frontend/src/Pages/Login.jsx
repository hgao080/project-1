import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password);
    }

    return (
        <form onSubmit={handleSubmit} className="">
            <h3>Login</h3>

            <label htmlFor="">Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="">Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>

            <button>Log in</button>
        </form>
    );
}
 
export default Login;