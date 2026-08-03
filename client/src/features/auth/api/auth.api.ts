import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export async function registerApi(data) {
    
    const response = await api.post("/api/v1/auth/register", data)

    console.log(response)
}