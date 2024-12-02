import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useAuthContext } from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const { user } = useAuthContext()

    if (user) {
        return <Navigate to="/" />
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className="">
            <h3>Login</h3>

            <label htmlFor="">Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="">Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>

            <button disabled={isLoading}>Log in</button>
            {error && <div>{error}</div>}
        </form>
    );
}
 
export default Login;