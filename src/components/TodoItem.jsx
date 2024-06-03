import React, { useCallback, useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import UpdateTodo from './UpdateTodo';
import { deleteTodo } from '../controllers/todo.controller';

const TodoItem = ({ item, getData }) => {
    const [updateModal, setUpdateModal] = useState(false)
    const changeUpdateModal = useCallback(() => {
        setUpdateModal(true)
    }, [item.id])

    const completeTask = useCallback(async () => {
        const res = await deleteTodo(item.id)
        if (res.status === 200) getData()
    }, [item.id])
    return (
        <>
            <li className='flex p-4 border border-blue-500 rounded-sm items-center justify-between gap-4'>
                <h3>{item.title}</h3>
                <div className='flex items-center gap-2 text-xl'>
                    <button
                        className='text-orange-500 active:bg-slate-200 rounded-full p-2 hover:bg-slate-100'
                        onClick={changeUpdateModal}
                    >
                        <MdModeEdit />
                    </button>
                    <button
                        className='text-green-700 rounded-full active:bg-slate-200 p-2 hover:bg-slate-100'
                        onClick={completeTask}
                    >
                        <CiCircleCheck />
                    </button>
                </div>
            </li>
            {
                updateModal && <UpdateTodo getData={getData} id={item.id} modalIsOpen={setUpdateModal} />
            }
        </>
    )
}

export default TodoItem