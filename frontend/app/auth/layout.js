import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Link from 'next/link'

const layout = ({children}) => {
    
  return (
    <div className='min-h-full min-w-full'>
        <header className=' flex bg-white justify-between p-2 h-[75px] shadow-sm min-w-full fixed z-10'>
            <div className='d-flex ps-2  gap-[10%] w-full'>
              <Link href={'/'} className='no-underline'>
                <div className='d-flex gap-1 justify-content-center align-items-center flex-row cursor-pointer '>
                    <i className='d-flex rounded-lg fa fa-shopping-cart h-[60px] min-w-[50px] justify-center items-center bg-green-800 text-white text-3xl'></i>
                    <p className='md:block hidden font-bold text-3xl m-0 text-black'>E-Shop</p>
                </div>
              </Link>
            </div>
        </header>
        <main className='w-full bg-[#f6f9FF] h-full fixed'>{children}</main>
    </div>
  )
}

export default layout