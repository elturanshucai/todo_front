import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdError } from 'react-icons/md';
import { login } from '../controllers/auth.controller';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/userSlice'

const Login = () => {
    const [passwordType, setPasswordType] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const submitForm = async (data) => {
        const user = await login(data)
        if (user.status === 200) {
            dispatch(signIn(user.data))
            toast.success('Welcome!')
            navigate('/')
        } else {
            toast.error('Wrong credentials!')
        }
    }
    return (
        <form
            onSubmit={handleSubmit(submitForm)}
            className='w-1/3 rounded p-5 mx-auto mt-20 flex flex-col gap-5 shadow-xl border'
        >
            <h1 className='text-blue-700 font-semibold uppercase'>LOGIN</h1>
            <div className='flex flex-col gap-3'>
                <label htmlFor="username">
                    Username <span className='ml-1 font-bold text-red-500'>*</span>
                </label>
                <input
                    id='username'
                    type="text"
                    className='rounded border border-blue-500 outline-2 focus:outline-offset-2 focus:outline-blue-300 px-2 py-1'
                    {...register("username", { required: "Username is required" })}
                />
                {errors.username &&
                    <span className='text-xs text-red-500 font-medium flex items-center gap-2'>
                        <MdError />
                        {errors.username.message}
                    </span>
                }
            </div>
            <div className='flex flex-col gap-3'>
                <label htmlFor="password">
                    Password <span className='ml-1 font-bold text-red-500'>*</span>
                </label>
                <div className='relative'>
                    <input
                        id='password'
                        type={passwordType ? 'password' : 'text'}
                        className='rounded border border-blue-500 outline-2 focus:outline-offset-2 focus:outline-blue-300 px-2 py-1 w-full pr-10'
                        {...register("password", {
                            required: "Password is required", minLength: {
                                message: "Password minimum length 6",
                                value: 6
                            }
                        })}
                    />
                    <span
                        className='absolute top-1 right-2 cursor-pointer text-xl duration-200 rounded-full p-1 hover:bg-slate-100'
                        onClick={() => setPasswordType(!passwordType)}
                    >
                        {passwordType ?
                            <IoEye /> : <IoEyeOff />
                        }
                    </span>
                </div>
                {errors.password &&
                    <span className='text-xs text-red-500 font-medium flex items-center gap-2'>
                        <MdError />
                        {errors.password.message}
                    </span>
                }
            </div>
            <p className='flex items-center justify-center gap-1 text-sm'>
                <span>You don't have an account?</span>
                <Link to={'/register'} className='text-blue-500'>Register</Link>
            </p>
            <div className='flex justify-start'>
                <button
                    type='submit'
                    className='rounded px-3 py-2 text-white font-medium uppercase text-sm bg-blue-500 hover:bg-blue-700 duration-200 w-full'
                >
                    Login
                </button>
            </div>
        </form>
    )
}

export default Login