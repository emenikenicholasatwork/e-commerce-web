'use client'
import React, { useEffect, useRef, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Link from 'next/link'
import { useGlobal } from '../globalContext'
import axiosInstance from '@/components/AxiosInstance'
import Cookies from 'js-cookie'
import { redirect } from 'next/navigation'

const layout = ({children}) => {
    const {openOrCloseCart, cartProduct, cartTotal, changeUserNameState, userName} = useGlobal();
    const [logout, setLogout] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const popupRef = useRef(null);
    useEffect(()=>{
        fetchUserDetails()
    },[])
    const fetchUserDetails = async ()=>{
        const response = await axiosInstance.get('/user/details',{
            params: {
                userId: localStorage.getItem('id')
            }
        })
        changeUserNameState(response.data.name)
    }
    logout && redirect('/auth/login')
    useEffect(()=>{
        const handleClickOutside = event =>{
            if(popupRef.current && ! popupRef.current.contains(event.target)){
                setIsPopupOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[])
  return (
    <div className='min-h-full min-w-full'>
        <header className=' flex bg-white justify-between p-2 h-[75px] shadow-sm min-w-full fixed z-10'>
            <div className='d-flex justify-content-center align-items-center md:gap-[10%] gap-[3%] w-full'>
                <div className='d-flex gap-1 justify-content-center align-items-center flex-row '>
                    <i className='d-flex rounded-lg fa fa-shopping-cart h-[60px] min-w-[50px] justify-center items-center bg-green-800 text-white text-3xl'></i>
                    <p className='md:block hidden font-bold text-3xl m-0'>E-Shop</p>
                </div>
                <div className='d-flex justify-content-center align-items-center w-[50%]'>
                    <input type="text" placeholder='Search' className='h-10 p-4 text-lg bg-[#f6f9ff] w-2/4 border-2 hidden md:block '/>
                </div>
                    <i className='bi bi-search md:hidden text-2xl me-5'></i>
            </div>

            <div className='d-flex flex-row justify-content-center align-items-center gap-2 relative cursor-pointer w-4/12'  onClick={(()=>{
                    setIsPopupOpen(true)
                })}>
                    <img src='/1.png' className='d-flex h-[50px] min-w-[50px] rounded-xl'/>
                    <p className='m-0 text-xl font-semibold hidden md:block'>My Account</p>
                    <i className='bi bi-caret-down-fill text-black text-lg hidden md:block'></i>
                </div>
                

                  {/* dropdown for user profile */}
                  <ul ref={popupRef} className={` ${isPopupOpen && 'show'} drop dropdown-menu dropdown-menu-end notifications dropdown-menu-arrow profile`}>
                        <li className='dropdown-header text-center'>
                            <h6 className='font-bold m-0'>{userName}</h6>
                        </li>
                        <li><hr className='dropdown-divider m-0'/></li>
                        <Link href={'/user/profile'} className='no-underline'>
                            <li className='notification-item d-flex'>
                                <a className='dropdown-item d-flex align-items-center'>
                                    <i className='bi bi-person'></i>
                                    <span>My Profile</span>
                                </a>
                            </li>
                        </Link>
                        <li><hr className='dropdown-divider m-0'/></li>
                        <li className='notification-item d-flex cursor-pointer' onClick={ ()=>{
                             localStorage.removeItem('id')
                             localStorage.removeItem('token')
                             Cookies.remove('token')
                            setLogout(true)
                        }}>
                            <a className='dropdown-item d-flex align-items-center'>
                                <i className='bi bi-box-arrow-right'></i>
                                <span>Sign Out</span>
                            </a>
                        </li>
                </ul>
                {/* end of dropdown for user profile */}
                
        </header>
        <div className='h-[80px] w-full '></div>
        <main className='w-full bg-[#f6f9FF] h-full fixed p-2 flex-wrap d-flex'>{children}</main>
        <footer className='flex justify-content-between align-items-center bg-white p-2 h-[75px] bottom-0 min-w-full fixed z-20'>
                <div className='d-flex flex-row gap-2 justify-content-center align-items-center'>
                    <p className='bg-green-900 text-white font-bold text-2xl d-flex justify-content-center align-items-center rounded-circle h-10 w-10'>{cartProduct.length}</p>
                    <p className='font-bold text-xl'>Items</p>
                </div>
                <div className='cursor-pointer' onClick={(()=>{openOrCloseCart()})}>
                    <i className='bi bi-cart text-5xl rounded-md h-16 w-16 bg-green-900  d-flex justify-content-center align-items-center text-white'></i>
                </div>
                <div className='d-flex font-bold text-xl'>
                    <p>Price :</p>
                    <p className='text-green-500'>&nbsp; {new Intl.NumberFormat('en-US',{
                        style: 'currency',
                        currency: 'USD'
                    }).format(cartTotal)}</p>
                </div>
        </footer>
    </div>
  )
}

export default layout