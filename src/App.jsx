import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import PrivateRoute from "./components/PrivateRoute"
import Login from "./pages/Login"
import { Toaster } from 'react-hot-toast'
import axios from "axios"
import Register from "./pages/Register"


function App() {

  const user = JSON.parse(localStorage.getItem('todoUser'))
  axios.defaults.headers.common['Authorization'] = `Bearer ${user?.token}`

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
