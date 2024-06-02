import React, { useEffect, useState } from 'react'
import { getUserTodos } from '../controllers/todo.controller'
import toast from 'react-hot-toast'
import TodoItem from '../components/TodoItem'
import CreateTodo from '../components/CreateTodo'
import { GiExitDoor } from "react-icons/gi";
import { useDispatch } from 'react-redux'
import { signOut } from '../redux/userSlice'

const Home = () => {
    const [todos, setTodos] = useState([])
    const [createModal, setCreateModal] = useState(false)
    const dispatch = useDispatch()

    const getMyTodos = async () => {
        const res = await getUserTodos()
        if (res.status === 200) {
            setTodos(res.data)
        } else {
            toast.error('Something went wrong!')
        }
    }

    useEffect(() => {
        getMyTodos()
    }, [])
    return (
        <main className='p-5 relative'>
            <h1 className='uppercase font-semibold text-blue-600 text-2xl p-5 text-center'>
                Todo App
            </h1>
            <div className='flex gap-10 items-center justify-between'>
                <button
                    type='button'
                    className='px-4 py-2 bg-green-600 text-white active:bg-green-800 rounded-sm'
                    onClick={() => setCreateModal(true)}
                >
                    New Todo
                </button>
                <button
                    type='button'
                    className='px-4 py-2 text-white bg-red-500 font-semibold flex items-center gap-2 rounded-sm'
                    onClick={() => dispatch(signOut())}
                >
                    Log Out
                    <GiExitDoor />
                </button>
            </div>
            <ul className='grid grid-cols-3 gap-5 mt-10'>
                {todos.map(item => (
                    <TodoItem key={item.id} item={item} getData={getMyTodos} />
                ))}
            </ul>
            {createModal && <CreateTodo getData={getMyTodos} modalIsOpen={setCreateModal} />}
        </main>
    )
}

export default Home