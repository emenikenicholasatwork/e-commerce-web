'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const page = () => {
  const [tab, setTab] = useState('o')
  return (
    <div className='pt-[80px] d-flex flex-row justify-content-center gap-5'>
      <div className='fixed z-50 bg-[#f6f9FF] h-14 left-[300px] top-[80px]'>
        <h3 className=''>Profile</h3>
      </div>
      <div>
        <div className='flex justify-content-center gap-5'>
          <div className='card p-5 text-center'>
            <Image src={'/1.png'} width={50} height={50} className='w-[300px] rounded-circle h-[300px] '/>
            <h4 className='m-0 mt-5 font-bold'>Emenike Nicholas</h4>
            <h5>Software Developer</h5>
          </div>
        </div>
      </div>
        <div className='justify-content-center'>
        <div className='card'>
          <div className='card-head'>
            <ul className='nav-tabs nav-tabs-bordered nav'>
              <li className='nav-item' role='presentation'>
                <button className={`${tab==='o' && 'active'} nav-link`} role='tab' aria-selected={`${tab === 'o' ? 'true' : 'false'}`} onClick={(()=>{setTab('o')})}>Overview</button>
              </li>
              <li className='nav-item' role='presentation'>
                <button className={`${tab==='e' && 'active'} nav-link`} role='tab' aria-selected={`${tab === 'e' ? 'true' : 'false'}`} onClick={(()=>{setTab('e')})}>Edit Profile</button>
              </li>
              <li className='nav-item' role='presentation'>
                <button className={`${tab==='s' && 'active'} nav-link`} role='tab' aria-selected={`${tab === 's' ? 'true' : 'false'}`} onClick={(()=>{setTab('s')})}>Settings</button>
              </li>
              <li className='nav-item' role='presentation'>
                <button className={`${tab==='c' && 'active'} nav-link`} role='tab' aria-selected={`${tab === 'c' ? 'true' : 'false'}`} onClick={(()=>{setTab('c')})}>Change Password</button>
              </li>
            </ul>
          </div>
          {
            tab === 'o' 
            && 

          <div className='card-body'>
            <h5 className='font-bold'>About</h5>
            <p className='max-w-[400px]'>Just an extra-ordinary developer with the aim of developing more projects...</p>
            <h5 className='font-bold'>Profile Details</h5>
            <div className='d-flex flex-row gap-5'>
              <p className='font-semibold'>Full Name</p>
              <p>Nicholas Emenike</p>
            </div>
            <div className='d-flex flex-row gap-5'>
              <p className='font-semibold'>Email</p>
              <p>emenikenicholas022@gmail.com</p>
            </div>
            <div className='d-flex flex-row gap-5'>
              <p className='font-semibold'>Phone</p>
              <p>08147281710</p>
            </div>
          </div>
          }
          {
            tab === 'c' 
            && 

          <div className='card-body d-flex flex-col'>
            <form>
              <div className='w-full d-flex justify-between gap-5 items-center mt-5'>
                <label htmlFor='currentPassword' className='font-semibold text-lg'>Current Password</label>
                <input required name='currentPassword' type='password' className='border-1 p-2 border-black rounded-md'/>
              </div>
              <div className='w-full justify-between d-flex gap-5 items-center mt-2'>
                <label htmlFor='newPassword' className='font-semibold text-lg'>New Password</label>
                <input required name='newPassword' type='password' className='border-1 p-2 border-black rounded-md'/>
              </div>
              <div className='w-full d-flex justify-between gap-5 items-center mt-2'>
                <label htmlFor='confirmPassword' className='font-semibold text-lg'>Confirm Password</label>
                <input required name='confirmPassword' type='password' className='border-1 p-2 border-black rounded-md'/>
              </div>
              <div className='w-full d-flex justify-content-center mt-5'>
                <button className='btn bg-primary text-white items-center ' type='submit'>Change Password</button>       
              </div>
            </form>
          </div>
          }
          {
            tab === 'e' 
            && 

          <div className='card-body d-flex flex-col'>
            <form>
              <div>
                <label className='font-semibold'>Profile Image</label>
                <Image src={'/1.png'} width={20} height={20} className='w-52 h-52'/>
                <div className='p-1 d-flex gap-2'>
                  <i title='upload new profile picture' className='cursor-pointer rounded-sm bi bi-upload p-2 text-white bg-primary'></i>
                  <i title='change profile picture' className='cursor-pointer rounded-sm bi bi-trash p-2 text-white bg-danger'></i>
                </div>
              </div>
              <div className='w-full justify-between d-flex gap-5 items-center mt-2'>
                <label htmlFor='fullName' className='font-semibold text-lg'>Full name</label>
                <input required name='fullName' type='text' className='border-1 p-2 border-black rounded-md'/>
              </div>
              <div className='w-full justify-between d-flex gap-5 items-center mt-2'>
                <label htmlFor='email' className='font-semibold text-lg'>Email</label>
                <input required name='email' type='email' className='border-1 p-2 border-black rounded-md'/>
              </div>
              <div className='w-full justify-between d-flex gap-5 items-center mt-2'>
                <label htmlFor='phone' className='font-semibold text-lg'>Phone</label>
                <input required name='phone' type='text' className='border-1 p-2 border-black rounded-md'/>
              </div>
              <div className='w-full d-flex justify-content-center mt-5'>
                <button className='btn bg-primary text-white items-center ' type='submit'>Save changes</button>       
              </div>
            </form>
          </div>
          }
          {
            tab === 's' 
            && 

          <div className='card-body d-flex flex-col'>
            <form>
              <p className='font-semibold'>Email Notification</p>
              <div>
                <div className='gap-2 d-flex flex-row form-check'>
                  <input type='checkbox'/>
                  <label>changes made to your account</label>
                </div>
                <div className='gap-2 d-flex flex-row form-check'>
                  <input type='checkbox'/>
                  <label>warning alerts</label>
                </div>
                <div className='gap-2 d-flex flex-row form-check'>
                  <input name='securityAlert' checked type='checkbox' disabled/>
                  <label htmlFor='securityAlert'>Security alerts</label>
                </div>
              </div>
              <div className='w-full d-flex justify-content-center mt-5'>
                <button className='btn bg-primary text-white items-center ' type='submit'>Save changes</button>       
              </div>
            </form>
          </div>
          }
        </div>
        </div>
      </div>
    // </div>
  )
}
export default page