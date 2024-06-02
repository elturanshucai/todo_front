import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

export const login = async (data) => {
    try {
        const res = await axios.post(`${baseURL}auth/login`, data);
        return res;
    } catch (error) {
        return error;
    }
}

export const registerUser = async (data) => {
    try {
        const res = await axios.post(`${baseURL}auth/register`, data)
        return res;
    } catch (error) {
        return error;
    }
}

export const logout = () => {
    localStorage.removeItem('todoUser')
    window.location.href = '/login'
}