'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

const page = () => {
  const [productList, setProductList] = useState([])

  useEffect(()=>{
    fetchProducts();
  },[])
  const fetchProducts= async ()=>{
    const response = await axios.get('http://localhost:8080/api/v1/admin/item/all')
    setProductList(response.data)
    console.log(response)
  }
  return (
    <div className='h-full w-full pt-5'>

      <div className='flex justify-content-between fixed z-50 bg-[#f6f9FF] h-14 w-[80%] top-[80px]'>
        <h3 className=''>189 Products</h3>
        <Link href={'/admin/product/add'}>
          <button className='bg-primary hidden xl:block text-white font-bold p-2 rounded-md'>Add Product</button>
        </Link>
        <input placeholder='Search' className=' p-2 text-center bg-white text-black font-bold border-1 rounded-md shadow-md' type='text'/>
      </div>
      <div className=' '>
      <div className='card p-3'>
        <div className=''>
            <h5 className=' m-0 font-bold'>Available Products</h5>
        </div>
        <hr className='mt-1 mb-3' />
        <div className='mb-52 overflow-auto'>

            <table className='w-full pb-52'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Preview</th>
                        <th>Product name</th>
                        <th>Amount Available</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      productList.map(product=>(
                      <tr key={product.id}>
                          <td>{product.id}</td>
                          <td><Image src={product.image1} width={20} height={20} className='shadow-md w-14 rounded-circle h-14'/></td>
                          <td>{product.name}</td>
                          <td>{product.available}</td>
                          <td>{new Intl.NumberFormat('en-US',{
                        style: 'currency',
                        currency: 'USD'
                    }).format(product.price)}</td>
                          <td className='justify-center ms-2 d-flex'>
                              <i className='bi bi-pencil-square bg-blue-500 font-bold text-lg rounded-lg text-white p-3 cursor-pointer'><span className='ms-2'>Edit</span></i>
                          </td>
                          <td>
                          <i className='bi bi-trash bg-danger font-bold text-lg rounded-lg text-white p-3 cursor-pointer' onClick={async()=>{
                            const response = await axios.delete('http://localhost:8080/api/v1/admin/delete/item',{
                              params: {
                                productId: product.id
                              }
                            })
                            setProductList(response.data)
                          }}><span className='ms-2'>Delete</span></i>
                          </td>
                      </tr>
                      ))
                    }
                </tbody>
            </table>
        </div>
        </div>
      </div>
    </div>
  )
}

export default page