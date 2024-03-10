'use client'
import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import  Jwt  from 'jsonwebtoken';


const Page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [validName, setValidName] = useState(false)
    const [nameLength, setNameLength] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordMatch, setIsPasswordMatch] = useState(false)
    const [isWeakPassword, setIsWeakPassword] = useState(false)
    const [isFairPassword, setIsFairPassword] = useState(false)
    const [isStrongPassword, setIsStrongPassword] = useState(false)
    const [isConditionsAccepted, setIsConditionAccepted] = useState(false)
    const [isConditions, setIsConditions] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [isAccountExist, setIsAccountExist] = useState(false)
    const [registerDetails, setRegisterDetails] = useState({
        name:'',
        email:'',
        firstPassword:'',
        password:''
    })

    const handleInputChange= async (e)=>{
        e.preventDefault()
        setRegisterDetails({
            ...registerDetails,
            [e.target.name]: e.target.value
        })
        e.target.name === 'name' && (()=>{setNameError(false);setNameLength(false);setValidName(false)})()
        e.target.name === 'email' && (()=>{setIsValidEmail(false);setIsEmailError(false),setIsAccountExist(false)})()
        e.target.name === 'password' && setIsPasswordMatch(false)
        e.target.name === 'firstPassword' && checkPasswordState(e)
        // setIsValidEmail(validateEmail(newEmail))
        
    }

    // this is just a function to check the password length and display the neccesary info about the password strength
    const checkPasswordState =(e)=>{
        setIsPasswordMatch(false);
        setIsFairPassword(false);
        setIsWeakPassword(false);
        setIsStrongPassword(false)
        e.target.value.length <= 5 && (()=>{setIsWeakPassword(true);setIsStrongPassword(false);setIsFairPassword(false);return false})()
        if (e.target.value.length > 5 && e.target.value.length <= 10){
            setIsWeakPassword(false);setIsStrongPassword(false);setIsFairPassword(true)
        }
        e.target.value.length > 10 && (()=>{setIsStrongPassword(true);setIsFairPassword(false);setIsWeakPassword(false)})()
    }

    const validateEmail = email =>{
        const emailRegex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{3}$/
        return emailRegex.test(email)
    }

    const validateForm= ()=>{
        if(registerDetails.name.length > 0 && registerDetails.name.length <= 4){
            setNameError(true)
            setValidName(true)
            return false
        }
        if (registerDetails.name.length === 0) {
            setNameLength(true)
            setNameError(true)
            return false
        }
        if(registerDetails.firstPassword !== registerDetails.password){
            setIsPasswordMatch(true)
            return false
        }
        if(registerDetails.firstPassword.length < 2){
            setIsWeakPassword(true)
            setIsFairPassword(false)
            setIsStrongPassword(false)
            return false
        }
        if(!validateEmail(registerDetails.email)){
            setIsValidEmail(true);
            setIsEmailError(true)
            return false
        }
        if(isWeakPassword){
            return false
        }
        if(!isConditions){
            setIsConditionAccepted(true)
            return false
        }
        return true
    }
    
    isLogin && redirect("/user")
    
    const submit = async (e)=>{
        e.preventDefault()
        if(validateForm()){
            try{
                const response = await axios.post('http://localhost:8080/auth/register',registerDetails)
                const token = response.data.token
                console.log(response)
                if(token){
                    console.log(Jwt.decode(token))
                    setIsLogin(true)
                }
            }catch(error){
                console.log(error)
                if(error.response.status === 302){
                    setIsAccountExist(true)
                }
            }
        }       
    }

  return (
    <div className='w-full h-full justify-content-center align-items-center d-flex'>
        <div className='h-[700px] overflow-auto bg-white w-[500px] p-3 shadow-md rounded-lg border-1 '>
            <h3 className='card-header font-bold text-primary'>Register</h3>
            <h5  className='text-[18px]'>Enter your personal details to create an account</h5>
            <form className=' h-full mt-5'>
                <div className='gap-3 d-flex flex-col'>
                    <div className=''>
                        <label htmlFor='name' className='font-bold w-full'>Name { nameLength && <span className='text-danger'> can not be empty</span>} { validName && <span className='text-danger'> must be more than 4 words</span>} </label>
                        <div className={`bg-[#f6f9FF] p-3 d-flex flex-row justiy-content-center gap-2 ${nameError && 'border-1 border-danger rounded-md'}`}>
                            <i className='bi bi-person-fill text-2xl'></i>
                            <input onChange={handleInputChange} name='name' type='text' placeholder='Full name' className='bg-transparent w-full outline-none text-xl'/>
                        </div>
                    </div>
                    <div>
                        <div className='d-flex flex-row justify-content-between'>
                            <label htmlFor='email' className='font-bold'>Email</label>
                            <div>
                                {isValidEmail && <span className='font-bold text-danger'>please enter a valid email account </span>}
                                {isAccountExist && <span className='font-bold text-danger'>Account with this email account alreay exist</span>}
                            </div>
                        </div>
                        <div className={`bg-[#f6f9FF] p-3 d-flex flex-row rounded-md ${isEmailError && 'border-1 border-danger'} justiy-content-center gap-2`}>
                            <i className='font-bold text-2xl'>@</i>
                            <input onChange={handleInputChange} name='email' type='text' placeholder='...@gmail.com' className='bg-transparent w-full outline-none text-xl'/>
                        </div>
                    </div>
                    <div className=''>
                        <div className='d-flex w-full justify-content-between'>
                            <label htmlFor='firstPassword' className='font-bold'>Password</label>
                            <div>
                                { isWeakPassword && <span className='text-danger font-bold'>Weak password <i className='bi bi-x-lg'></i></span>}
                                { isFairPassword && <span className='text-warning font-bold'>Fair password <i className='bi bi-check-lg'></i></span>}
                                { isStrongPassword && <span className='text-success font-bold'>Strong password <i className='bi bi-shield-check'></i></span>}
                            </div>
                        </div>
                        <div className={`bg-[#f6f9FF] ${isWeakPassword && 'border-1 border-danger'} ${isFairPassword && 'border-1 border-warning'} ${isStrongPassword && 'border-1 border-success'} p-3 d-flex flex-row justiy-content-center gap-2 rounded-md`}>
                            <i className=' fa fa-lock text-2xl'></i>
                            <input onChange={handleInputChange} name='firstPassword' type={`${showPassword ? 'text' : 'password'}`} placeholder='Password' className='bg-transparent w-full outline-none text-xl'/>
                        </div>
                    </div>
                    <div>
                        <div className='w-full d-flex justify-content-between'>
                            <label htmlFor='password' className='font-bold'>Confirm Password</label>
                            { isPasswordMatch && <label htmlFor='password' className='font-bold text-danger'>must match the first password</label>}
                        </div>
                        <div className={`bg-[#f6f9FF] p-3 d-flex flex-row justiy-content-center gap-2 ${isPasswordMatch && 'border-1 border-danger rounded-md'} `}>
                            <i className='fa fa-lock text-2xl'></i>
                            <input name='password' onChange={handleInputChange} type={`${showPassword ? 'text' : 'password'}`} placeholder='Confirm Password' className='bg-transparent w-full outline-none text-xl'/>
                        </div>
                    </div>                    
                </div>
                <div className='d-flex flex-row gap-2 w-full justify-content-end text-lg mt-2'>
                    <p className='m-0'>show password</p>
                    <input type='checkbox' onClick={(()=>{showPassword ? setShowPassword(false) : setShowPassword(true)})}/>
                </div>       
                <p className='text-md m-0'>Already have an account? <Link href={'/auth/login'} className='no-underline'>Login</Link> </p>
                <div className=''>
                    <div className='d-flex flex-row gap-2'>
                        <input type='checkbox' required onClick={(e)=>{setIsConditionAccepted(false);isConditions ? setIsConditions(false) : setIsConditions(true)}}/>
                        <p className='m-0'>I agree and accepts the <span className='text-primary cursor-pointer'>Terms and Conditions</span></p>
                    </div>
                        { isConditionsAccepted && <p className='m-0 font-bold text-danger'>you must accept the terms and conditions..</p>}
                </div>
                <button type='submit' onClick={(e)=>{submit(e)}} className=' mt-3 bg-primary shadow-md hover:opacity-80 bottom-0 top-5 w-[200px] h-[50px] text-white font-bold rounded-md'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Page