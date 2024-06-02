import React from 'react'
import Modal from './Modal'
import { useForm } from 'react-hook-form'
import { createTodo } from '../controllers/todo.controller'
import toast from 'react-hot-toast'
import { MdError } from 'react-icons/md'
import { IoClose } from "react-icons/io5";

const CreateTodo = ({ modalIsOpen, getData }) => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const submitForm = async (data) => {
        const res = await createTodo(data)
        if (res.status === 201) {
            getData()
            toast.success('Todo created')
            modalIsOpen(false)
        } else {
            toast.error('Error')
        }
    }
    return (
        <Modal>
            <form
                className='w-1/3 bg-white rounded mx-auto flex flex-col relative p-5 gap-5'
                onSubmit={handleSubmit(submitForm)}
            >
                <button
                    className='absolute right-3 top-3 text-xl p-2 hover:bg-slate-100 duration-200'
                    type='button'
                    onClick={() => modalIsOpen(false)}
                >
                    <IoClose />
                </button>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="title">Title</label>
                    <input
                        autoFocus
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        id='title'
                        className='rounded border border-blue-500 outline-2 focus:outline-offset-2 focus:outline-blue-300 px-2 py-1'
                    />
                    {errors.title &&
                        <span className='text-xs font-semibold flex items-center gap-2 text-red-500'>
                            <MdError />
                            {errors.title.message}
                        </span>
                    }
                </div>
                <button
                    type='submit'
                    className='w-full rounded px-4 py-2 bg-blue-500 text-white font-medium uppercase'
                >
                    Create
                </button>
            </form>
        </Modal>
    )
}

export default CreateTodo;