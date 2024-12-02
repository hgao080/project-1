import { useState } from "react";
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext()

    const login = async (email, password, username) => {
        setIsLoading(true)
        setError(null)

        const res = await fetch('http://localhost:3001/api/user/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password, username})
        })

        const json = await res.json()

        if (!res.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (res.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}