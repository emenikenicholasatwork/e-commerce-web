'use client'
import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.css'
import './admin.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Link from 'next/link'

const layout = ({children}) => {
    const [profile, setProfile] = useState(false)
    const [position, setPosition] = useState('dashboard')
    const [notification, setNotification] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const clearAllPopup=()=>{
        setNotification(false)
        setProfile(false)
    }
  return (
    <div className='h-full w-full'>
        <header className=' flex bg-white justify-between p-2 h-[75px] shadow-sm min-w-full fixed z-10'>
            <div className='d-flex justify-content-center align-items-center gap-[10%] w-full'>
                <div className='d-flex gap-1 justify-content-center align-items-center flex-row '>
                    <i className='d-flex rounded-lg fa fa-shopping-cart h-[60px] min-w-[50px] justify-center items-center bg-green-800 text-white text-3xl'></i>
                    <p className='md:block hidden font-bold text-3xl m-0'>E-Shop</p>
                </div>
                <div className='d-flex justify-content-center align-items-center w-[50%]'>
                    <i className='bi bi-list text-3xl cursor-pointer md:hidden' onClick={(()=>{
                        showSidebar ? setShowSidebar(false) : setShowSidebar(true)
                    })}></i>
                    <input type="text" placeholder='Search' className='h-10 p-4 text-lg bg-[#f6f9ff] w-2/4 border-2 hidden md:block '/>
                </div>
                    <i className='bi bi-search md:hidden text-2xl me-5'></i>
            </div>
            <div className=' gap-2 d-flex flex-row justify-content-center align-items-center cursor-pointer w-4/12'>
                <div className='relative'>
                    <a className='nav-link relative me-4' onClick={(()=>{
                        clearAllPopup()
                    notification ? setNotification(false) : setNotification(true)
                })}>
                        <span className='badge bg-primary absolute top-0 left-3 font-normal'>4</span>
                        <i className='bi bi-bell text-2xl'></i>
                    </a>

                    {/* dropdown for admin notification */}
                    <ul className={` ${notification ? 'show':''} drop dropdown-menu dropdown-menu-end notifications dropdown-menu-arrow`}>
                        <li className='dropdown-header font-bold '>You have 3 new messages 
                            <a href="#" className=''>
                                <span className='badge bg-primary rounded-pill p-2 ms-2'>View all</span>
                            </a>
                        </li>
                        <li><hr className='dropdown-divider m-0'/></li>
                        <li className='notification-item d-flex'>
                            <i className='bi bi-exclamation-circle text-warning'></i>
                            <div>
                                <h4 className='m-0 text-[16px]'>Macbook pro</h4>
                                <p className='m-0 text-[13px] font-semibold'>this product is about to finish only 5 pieces left</p>
                                <p className='m-0 text-[13px]'>30 min. ago</p>
                            </div>
                        </li>
                        <li><hr className='dropdown-divider m-0'/></li>
                        <li className='notification-item d-flex'>
                            <i className='bi bi-x-circle text-danger'></i>
                            <div>
                                <h4 className='m-0 text-[16px]'>Macbook pro</h4>
                                <p className='m-0 text-[13px] font-semibold'>this product is about to finish only 5 pieces left</p>
                                <p className='m-0 text-[13px]'>1 hr. ago</p>
                            </div>
                        </li>
                        <li><hr className='dropdown-divider m-0'/></li>
                        <li className='notification-item d-flex'>
                            <i className='bi bi-check-circle text-success'></i>
                            <div>
                                <h4 className='m-0 text-[16px]'>Macbook pro</h4>
                                <p className='m-0 text-[13px] font-semibold'>this product is about to finish only 5 pieces left</p>
                                <p className='m-0 text-[13px]'>2 hr. ago</p>
                            </div>
                        </li>
                        <li><hr className='dropdown-divider m-0'/></li>
                        <li className='notification-item d-flex'>
                            <i className='bi bi-info-circle text-primary'></i>
                            <div>
                                <h4 className='m-0 text-[16px]'>Macbook pro</h4>
                                <p className='m-0 text-[13px] font-semibold'>this product is about to finish only 5 pieces left</p>
                                <p className='m-0 text-[13px]'>4 hr. ago</p>
                            </div>
                        </li>
                        <li><hr className='dropdown-divider m-0'/></li>
                        <li className='dropdown-footer text-center text-[15] p-[10px]'>
                            <a className='text-black'>Show all notifications</a>
                        </li>
                    </ul>
                    {/* end of dropdown for admin notification */}

                </div>

                
                <div className='d-flex flex-row justify-content-center align-items-center gap-2 relative'  onClick={(()=>{
                    clearAllPopup()
                    profile ? setProfile(false) : setProfile(true)
                })}>
                    <img src='/1.png' className='d-flex h-[50px] min-w-[50px] rounded-xl'/>
                    <p className='m-0 text-xl font-semibold hidden md:block'>Administrator</p>
                    <i className='bi bi-caret-down-fill text-black text-lg hidden md:block'></i>
                </div>

                 {/* dropdown for admin profile */}
                 <ul className={` ${profile && 'show'} drop dropdown-menu dropdown-menu-end notifications dropdown-menu-arrow profile`}>
                        <li className='dropdown-header text-center'>
                            <h6 className='font-bold m-0'>Emenike Nicholas</h6>
                            <span className=''>Software Developer</span>
                        </li>
                        <li><hr className='dropdown-divider m-0'/></li>
                        <Link href={'/admin/profile'} className='no-underline'> 
                            <li className='notification-item d-flex'>
                                <a className='dropdown-item d-flex align-items-center'>
                                    <i className='bi bi-person'></i>
                                    <span>My Profile</span>
                                </a>
                            </li>
                        </Link>
                        <li><hr className='dropdown-divider m-0'/></li>
                        <li className='notification-item d-flex'>
                            <a className='dropdown-item d-flex align-items-center'>
                                <i className='bi bi-gear'></i>
                                <span>Account Settings</span>
                            </a>
                        </li>
                        <li><hr className='dropdown-divider m-0'/></li>
                        <li className='notification-item d-flex'>
                            <a className='dropdown-item d-flex align-items-center'>
                                <i className='bi bi-question-circle'></i>
                                <span>Need Help?</span>
                            </a>
                        </li>
                        <li><hr className='dropdown-divider m-0'/></li>
                        <Link href={'/auth/login'} className='no-underline'>
                            <li className='notification-item d-flex'>
                                <a className='dropdown-item d-flex align-items-center'>
                                    <i className='bi bi-box-arrow-right'></i>
                                    <span>Sign Out</span>
                                </a>
                            </li>
                        </Link>
                </ul>
                {/* end of dropdown for admin profile */}

            </div>
        </header>
        <div className='h-[80px] w-full '></div>
        <div className='w-full h-full fixed d-flex flex-row'>
            <div className={ `top-[75px] h-ful bg-white hidden md:block ${showSidebar && 'block'} w-[300px] shadow-md p-[20px]`}>
                    <ul className='m-0 p-0 w-full'>
                        <Link href={'/admin'} className='no-underline'>
                            <li className={`cursor-pointer p-2 ${position==='dashboard' && ' bg-[#f6f9FF] '} `} onClick={(()=>{
                                setPosition('dashboard')})}>
                                <a className='gap-2 flex no-underline'>
                                    <i className='bi bi-grid'></i>
                                    <span className={`text-[#012970] ${position==='dashboard' && 'text-[#4154F1]'} font-bold text-md`}>Dashboard</span>
                                </a>
                            </li>
                        </Link>
                        <Link href={'/admin/product'} className='no-underline'>
                            <li className={`cursor-pointer p-2 ${position==='product' && 'bg-[#f6f9FF] text-[#4154F1]'} `} onClick={(()=>{
                                setPosition('product')
                            })}>
                                <a className='gap-2 flex no-underline'>
                                    <i className='bi bi-menu-button-wide'></i>
                                    <span className={`text-[#012970] ${position==='product' && 'text-[#4154F1]'} font-bold text-md`}>Products</span>
                                </a>
                            </li>
                        </Link>
                        <Link href={'/admin/user'} className='no-underline'>
                            <li className={`cursor-pointer p-2 ${position==='user' && 'bg-[#f6f9FF] text-[#4154F1]'} `} onClick={(()=>{
                                setPosition('user')
                            })}>
                                <a className='gap-2 flex no-underline'>
                                    <i className='bi bi-people'></i>
                                    <span className={`text-[#012970] ${position==='user' && 'text-[#4154F1]'} font-bold text-md`}>Users</span>
                                </a>
                            </li>
                        </Link>
                        <Link href={'/admin/profile'} className='no-underline'>
                            <li className={`cursor-pointer p-2 ${position==='profile' && 'bg-[#f6f9FF] text-[#4154F1]'} `} onClick={(()=>{
                                setPosition('profile')
                            })}>
                                <a className='gap-2 flex no-underline'>
                                    <i className='bi bi-person'></i>
                                    <span className={`text-[#012970] ${position==='profile' && 'text-[#4154F1]'} font-bold text-md`}>Profile</span>
                                </a>
                            </li>
                        </Link>
                    </ul>
                    
                            <a className='cursor-pointer gap-2 flex no-underline bottom-5 fixed p-3'>
                                <i className='bi bi-box-arrow-right'></i>
                                <span className='text-[#012970] font-bold text-md'>Sign out</span>
                            </a>
                        
            </div>
            <main className='p-3 bg-[#f6f9FF] w-full overflow-auto'>{children}</main>
        </div>
    </div>
  )
}

export default layout