'use client'
import React, { useEffect, useState } from 'react'
import './admindashboard.css'
import axios from 'axios'

const RecentActivitiesCard = () => {
    const [recentActivites, setRecentActivities] = useState([])
    const [filter, setFilter] = useState('today')
    const [showFilter, setShowFilter] = useState(false)

    useEffect(()=>{
        fetchActivites();
    },[])

    const fetchActivites = async ()=>{
        const response = await axios.get('http://localhost:8080/api/v1/admin/recentActivites')
        setRecentActivities(response.data)
    }
  return (
    <div className='flex h-[500px] flex-col '>
        <div className='card w-[500px] p-3 flex-auto'>
            <div className='d-flex justify-between'>
                <h5 className=''>Recent Activities | <span className='text-md text-[#4154F1]'>{filter}</span></h5>
                <i className='bi bi-three-dots relative cursor-pointer' onClick={(()=>{
                    showFilter ? setShowFilter(false) : setShowFilter(true)
                })}>
                    <ul className={` popup dropdown-menu dropdown-menu-end dropdown-menu-arrow ${showFilter && 'show'} absolute`}>
                    <li className='dropdown-header text-start text-[#AAB7CF] text-bold'><h6>Filter</h6></li>
                    <li className='dropdown-item cursor-pointer' onClick={(()=>{setFilter('today')})}><a>Today</a></li>
                    <li className='dropdown-item cursor-pointer' onClick={(()=>{setFilter('This month')})}><a>This month</a></li>
                    <li className='dropdown-item cursor-pointer' onClick={(()=>{setFilter('This year')})}><a>This year</a></li>
                    </ul>
                </i>
            </div>
                {
                    recentActivites.map(activity=>(
                    <div key={activity.id}>
                        <hr />
                        <div className='flex flex-row gap-5'>
                            <p>{activity.time}</p>
                            <p className='font-bold'>{activity.activity}</p>
                        </div>
                    </div>
                    ))
                }

        </div>
    </div>
  )
}

export default RecentActivitiesCard