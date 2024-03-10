"use client"
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../AxiosInstance'
import { useGlobal } from '@/app/globalContext'

const UserItemCard = () => { 
  const [products, setProducts] = useState([])
  const {changeRefreshState} = useGlobal()
  useEffect(()=>{
    fetchProduct()
  },[])
  const fetchProduct = async () =>{
    const response = await axios.get('http://localhost:8080/home/item/all')
    setProducts(response.data)
  }
  return (      
        products.map(product => (
            <div key={product.id} className=' h-[350px] w-[250px] d-flex flex-col rounded-md bg-white justify-content-center cursor-pointer p-2 item' >
                <Link href={'/item'} className='no-underline'>
                <Image
                className='w-[300px] h-[200px]'
                src={product.image1} 
                alt="Item Image"
                height={200} 
                width={200}/>

          </Link>
                <div className='' >
                  <p className='m-0 text-sm line-clamp-2 text-black'>{product.description}</p>
                  <div className=''>
                    <p className='m-0 font-bold text-green-500 text-xl'>{new Intl.NumberFormat('en-US',{
                        style: 'currency',
                        currency: 'USD'
                    }).format(product.price)}</p>
                  </div>       
                </div>
                <button className='bg-[#FB923C] hover:bg-[#c56e28] text-white h-16 cursor-pointer rounded-md font-bold' onClick={async(e)=>{
                    e.preventDefault()
                    try{
                        await axiosInstance.get('/user/addToCart',{
                          params: {
                            userId: localStorage.getItem('id'),
                            productId: product.id
                        }
                        })
                        changeRefreshState()
                    }catch(err){
                    }
                }}>ADD TO CART</button>
            </div>
        ))
  )
}

export default UserItemCard