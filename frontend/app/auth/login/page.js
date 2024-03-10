'use client'
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import  Jwt  from 'jsonwebtoken';

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDetailsValid, setIsDetailsValid] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isAccountExist, setIsAccountExist] = useState(false)
  const [loginDetails, setLoginDetails] = useState({
    email:'',
    password:''
  })

  const handleInputChange =(e)=>{
    e.preventDefault()
    setLoginDetails({
        ...loginDetails,
        [e.target.name]: e.target.value
    })
    setIsDetailsValid(false)
    setIsAccountExist(false)
  }

  isLogin && redirect('/user')

  const login = async (e)=>{
    await e.preventDefault()
    try{
        const response = await axios.post('http://localhost:8080/auth/login', loginDetails)
        const token = response.data.token
        if(token){
            Cookies.set('token', token, {expires: 7});
            const t = Jwt.decode(token)
            localStorage.setItem('id', t.sub)
            setIsLogin(true)
        }
    }catch(error){
        if(error.response.status===401){
            setIsDetailsValid(true)
        }
        if(error.response.status===403){
            setIsAccountExist(true)
        }
    }
  }
  
  return (
    <div className='w-full h-full justify-content-center align-items-center d-flex'>
        <div className='h-[500px] bg-white w-[500px] p-3 shadow-md rounded-lg border-1 '>
            <h3 className='card-header font-bold text-primary'>Login</h3>
            <h5  className='text-[18px]'>Enter credentials to login</h5>
                <div className='w-full d-flex flex-col justify-content-center align-items-center'>
                    { isAccountExist && <p className=' m-0 font-bold text-danger'>Account does not exist...</p>}
                    { isDetailsValid && <p className='m-0 font-bold text-danger'>Incorrect credentials</p>}
                </div>
            <form className=' h-full mt-2'>
                <div className='gap-3 d-flex flex-col'>
                    <div>
                        <label htmlFor='email' className='font-bold'>Email</label>
                        <div className='bg-[#f6f9FF] p-3 d-flex flex-row justiy-content-center gap-2'>
                            <i className='font-bold text-2xl'>@</i>
                            <input required name='email' onChange={handleInputChange} type='text' placeholder='...@gmail.com' className='bg-transparent w-full outline-none text-xl'/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='password' className='font-bold'>Password</label>
                        <div className='bg-[#f6f9FF] p-3 d-flex flex-row justiy-content-center gap-2'>
                            <i className=' fa fa-lock text-2xl'></i>
                            <input required name='password' onChange={handleInputChange} type={`${showPassword ? 'text' : 'password'}`} placeholder='Password' className='bg-transparent w-full outline-none text-xl'/>
                        </div>
                    </div>               
                </div>
                <div className='d-flex flex-row gap-2 w-full justify-content-end text-lg mt-2'>
                    <p className='m-0'>show password</p>
                    <input type='checkbox' onClick={(()=>{showPassword ? setShowPassword(false) : setShowPassword(true)})}/>
                </div>       
                <p className='text-md m-0'>Forgot passcode? <Link href={'/'} className='no-underline'>Click here</Link> </p>
                <p className='text-md m-0'>Don't have an account? <Link href={'/auth/register'} className='no-underline'>Create an account</Link> </p>
                <button type='submit' className=' mt-3 bg-primary shadow-md hover:opacity-80 bottom-0 top-5 w-[200px] h-[50px] text-white font-bold rounded-md' onClick={(e)=>{login(e)}}>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Page