import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useAuthContext } from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const { user } = useAuthContext()

    if (user) {
        if (user.isAdmin) {
            return <Navigate to="/admin" />
        }

        return <Navigate to="/" />
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email) && email !== 'admin') {
            alert('Please enter a valid email address')
            return
        }

        await login(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className="">
            <h3>Login</h3>

            <label htmlFor="">Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="">Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>

            <button disabled={isLoading}>Log in</button>
            {error && <div>{error}</div>}
        </form>
    );
}
 
export default Login;