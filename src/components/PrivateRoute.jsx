import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("todoUser"))
    return (
        user ? children : <Navigate to={'/login'} />
    )
}

export default PrivateRoute