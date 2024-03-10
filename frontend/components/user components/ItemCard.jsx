"use client"
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ItemCard = () => {
  const [products, setProducts] = useState([])
  useEffect(()=>{
    fetchProduct()
  },[])
  const fetchProduct = async () =>{
    const response = await axios.get('http://localhost:8080/home/item/all')
    setProducts(response.data)
  }
  return (      
        products.map(product => (
          <Link href={'/item'} className='no-underline'>
            <div key={product.id} className=' h-[350px] w-[250px] d-flex flex-col rounded-md bg-white justify-content-center cursor-pointer p-2 item' >
                <Image
                className='w-[300px] h-[200px]'
                src={product.image1} 
                alt="Item Image"
                height={200} 
                width={200}/>

                <div className='' >
                  <p className='m-0 text-sm line-clamp-2 text-black'>{product.description}</p>
                  <div className=''>
                    <p className='m-0 font-bold text-green-500 text-xl'>{new Intl.NumberFormat('en-US',{
                        style: 'currency',
                        currency: 'USD'
                    }).format(product.price)}</p>
                  </div>       
                </div>
                <button className='bg-[#FB923C] hover:bg-[#c56e28] text-white h-16 cursor-pointer rounded-md font-bold'>ADD TO CART</button>
            </div>
          </Link>
        ))
  )
}

export default ItemCard