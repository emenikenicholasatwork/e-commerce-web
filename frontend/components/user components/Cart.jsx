'use client'
import { useGlobal } from '@/app/globalContext'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../AxiosInstance'

const Cart = () => {
    const {openCart, refresh, changeRefreshState, changeCartProduct, cartProduct, changeCartTotal, changeCartProductCount, cartProductCount} = useGlobal();
    useEffect(()=>{
        fetchData();
    },[refresh])
    const fetchData = async () =>{
        try{
            const response = await axiosInstance.get('/user/cart',{
                params: {
                    userId: localStorage.getItem('id')
                }
            })
            changeCartProduct(response.data.products)
            changeCartTotal(response.data.total)
            changeCartProductCount(response.data.productCount)
            console.log(response)
        }catch(error){
            console.log('Error fetching data:', error)
        }
    };
    
  return (
    <div className={`fixed p-5 top-[80px] rounded-t-3xl bottom-0 left-0 w-full bg-gray-500 ${openCart ? 'translate-y-0 transition-transform ease-out' : 'translate-y-full transition-transform ease-in'} `}>
        <h2 className='text-white font-bold'>Selected Items</h2>
        <div className='mt-5 h-full d-flex flex-col gap-3 overflow-auto pb-80'>
        {
            cartProduct.map(product => (
                <div key={product.id} className='d-flex align-items-center gap-5 w-full'>
                    <i className='bi bi-trash text-lg text-white cursor-pointer hover:bg-red-700 rounded-md d-flex justify-content-center align-items-center p-3' onClick={async()=>{
                        await axiosInstance.delete('/user/deleteFromCart',{
                            params: {
                                userId: localStorage.getItem('id'),
                                productId: product.id
                            }
                        })
                        changeRefreshState()
                    }}></i>
                    <Image src={product.image1} width={20} height={20} className='w-36 h-36 rounded-lg'/>
                    <div className='d-flex justify-between pe-[100px] flex-row w-full'>
                        <div>
                            <p className='font-bold text-white text-lg'>{product.name}</p>
                            <p className='font-bold text-white text-lg'>{new Intl.NumberFormat('en-US',{
                        style: 'currency',
                        currency: 'USD'
                    }).format(product.price)}</p>
                        </div>
                        <div className='d-flex text-white align-items-center flex-col'>
                            {
                                cartProductCount.map(i=>(
                                    <h3 key={i.id}>{i.productId===product.id ? i.count : ''}</h3>
                                ))
                            }
                           

                            <div className='d-flex flex-row gap-2'>
                                <button className='md:hover:bg-green-800 font-bold border-1 border-black rounded-md shadow-md text-2xl p-2' onClick={async()=>{
                                    await axiosInstance.get('/user/addToCart',{
                                        params: {
                                            userId: localStorage.getItem('id'),
                                            productId: product.id
                                        }
                                    })
                                    changeRefreshState()
                                }}>+</button>
                                <button className='md:hover:bg-red-800 font-bold border-1 border-black w-[30px] rounded-md shadow-md text-2xl p-2' onClick={async()=>{
                                    await axiosInstance.get('/user/reduceProductCount',{
                                        params: {
                                            userId: localStorage.getItem('id'),
                                            productId: product.id
                                        }
                                    })
                                    changeRefreshState()
                                }}>-</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
        </div>
        <button className='bottom-[100px] font-bold bg-blue-700 hover:shadow-lg hover:bg-blue-900 p-3 text-white rounded-md w-24 text-lg fixed'>Pay</button>
    </div>
  )
}

export default Cart