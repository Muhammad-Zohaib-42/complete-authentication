import { useState } from "react";
import {registerApi} from "./api/auth.api.ts"
import toast from "react-hot-toast";

export function useAuth() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function registerUser(data) {
        setLoading(true)
        
        try {
            await registerApi(data)
            setLoading(false)    
            toast.success("user created successfully!")
        } catch (error) {
            console.dir(error)
            setLoading(false)
            setError("something went wrong while registering the user")
            toast.error("failed to create user! error: ", error)

        } finally {
            setLoading(false)
        }
    }

    return {registerUser, loading, error}
}