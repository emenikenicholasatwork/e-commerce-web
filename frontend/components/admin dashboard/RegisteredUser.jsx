'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const RegisteredUser = () => {
    const[userList, setUsersList] = useState([])
    const [confirmDelete, setConfirmDelete] = useState(false)

    useEffect(()=>{
        fetchUsers()
    },[])

    const fetchUsers= async ()=>{
        const response = await axios.get('http://localhost:8080/api/v1/admin/users/all')
        setUsersList(response.data)
    }
  return (
        <div className='card p-3'>
        <div className=''>
            <h5 className=' m-0 font-bold'>Registered Users</h5>
        </div>
        <hr className='mt-1 mb-3' />
        <div className='mb-52 overflow-auto'>

            <table className='w-full pb-52'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Preview</th>
                        <th>Full name</th>
                        <th>Email</th>
                        <th>Date of account</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map(user=>(
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td><Image src={userList.image ? user.image : '/1.png'} width={20} height={20} className='w-14 rounded-circle h-14'/></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created}</td>
                                <td className=''>
                                    <p className='bg-success text-white text-center font-bold p-3 rounded-md'>Verified</p>    
                                </td>
                                <td className=' h-14 xl:flex gap-2 hidden'>
                                        <i className='bi bi-pencil-square d-flex justify-content-center align-items-center w-full h-[52px] bg-blue-500 font-bold text-lg rounded-lg text-white p-1 cursor-pointer'><span className='ms-2'>Edit</span></i>
                                        <i onClick={()=>{setConfirmDelete(true)}} className='bi bi-trash h-[52px] d-flex justify-content-center align-items-center  bg-danger font-bold text-lg rounded-lg text-white p-1 w-full cursor-pointer'><span className='ms-2'>Delete</span></i>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        {
            confirmDelete && 
        <div className='fixed top-0 left-0 bg-[rgb(0,0,0,0.5)] w-full h-full z-50 justify-content-center align-items-center flex'>
                    <div className='w-80 h-44 bg-white rounded-md flex flex-col align-items-center p-2'>
                        <p className='text-xl font-bold'>Are you sure to delete user</p>
                        <div className='flex flex-row gap-5 pt-3'>
                            <i className='bi bi-check text-white cursor-pointer rounded-circle p-3 font-bold text-3xl bg-success'></i>
                            <i className='bi bi-x p-3 text-bold cursor-pointer bg-danger rounded-circle text-white text-3xl' onClick={()=>{setConfirmDelete(false)}}></i>
                        </div>
                    </div>
        </div>
        }
        </div>
  )
}

export default RegisteredUser