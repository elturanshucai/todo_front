import React from 'react'

const Modal = ({ children }) => {
    return (
        <div className='bg-black bg-opacity-60 h-screen absolute top-0 w-screen z-30 left-0 flex justify-center items-center'>
            {children}
        </div>
    )
}

export default Modal