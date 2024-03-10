"use client"
import Cart from '@/components/user components/Cart'
import UserItemCard from '@/components/user components/UserItemCard'
import React from 'react'

const UserPage = () => {
  return (
    <div className='w-full flex flex-wrap overflow-auto gap-2 pb-52'>
      <UserItemCard/>
      <Cart/>
    </div>
  )
}

export default UserPage