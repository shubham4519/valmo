import Image from 'next/image'
import React from 'react'

function Layout({ children }) {
    return (
        <>
            <div className='flex justify-center items-center h-[100vh] w-[100vw] bg-blue-400'>
                {children}
            </div>
        </>
    )
}

export default Layout