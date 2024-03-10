import RegisteredUser from '@/components/admin dashboard/RegisteredUser'
import React from 'react'

const page = () => {
  return (
    <div className='h-full w-full pt-5'>
      <div className='flex justify-between fixed z-50 bg-[#f6f9FF] h-14 w-full top-[80px]'>
        <h3 className=''>189 Users</h3>
        <input placeholder='Search' className=' fixed right-10 p-2 text-center flex bg-white text-black font-bold border-1 rounded-md shadow-md' type='text'/>
      </div>
      <div className=' '>
        <RegisteredUser/>
      </div>
    </div>
  )
}

export default page