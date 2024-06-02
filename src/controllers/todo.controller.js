import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

export const getUserTodos = async () => {
    try {
        const res = await axios.get(`${baseURL}todo/all`)
        return res;
    } catch (error) {
        return error;
    }
}

export const viewTodo = async (id) => {
    try {
        const res = await axios.get(`${baseURL}todo/view/${id}`)
        return res;
    } catch (error) {
        return error;
    }
}

export const createTodo = async (data) => {
    try {
        const res = await axios.post(`${baseURL}todo/create`, data)
        return res;
    } catch (error) {
        return error;
    }
}

export const updateTodo = async ({ id, data }) => {
    try {
        const res = await axios.put(`${baseURL}todo/update/${id}`, data)
        return res;
    } catch (error) {
        return error;
    }
}

export const deleteTodo = async (id) => {
    try {
        const res = await axios.delete(`${baseURL}todo/delete/${id}`)
        return res;
    } catch (error) {
        return error;
    }
}