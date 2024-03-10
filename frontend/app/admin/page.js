'use client'
import React from 'react'
import StatisticsCard from '@/components/admin dashboard/StatisticsCard'
import RecentActivitiesCard from '@/components/admin dashboard/RecentActivitiesCard'
import RecentSales from '@/components/admin dashboard/RecentSales'
import Topselling from '@/components/admin dashboard/Topselling'

const page = () => {
  return (
    <div className='pb-20 pt-5'>
          <h3 className='m-0 fixed font-bold p-2 top-[75px] z-50 h-10 w-full bg-[#f6f9FF]'>
            Dashboard
          </h3>

        <div className='flex-row h-full d-flex gap-5 '>
          <div className='d-flex h-full flex-col w-full gap-5'>
            <StatisticsCard/>
            <RecentSales/>
            <Topselling/>
          </div>
          <div className='d-flex flex-auto h-full'>
            <RecentActivitiesCard/>
          </div>

        </div>
    </div>
  )
}

export default page