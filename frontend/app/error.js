'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const error = () => {
  return (
    <main>
        <div className='container'>
            <section className='min-vh-100 d-flex flex-col gap-2 align-items-center justify-content-center'>
                <h1 className='text-[200px] text-[#4154F1] m-0 p-0'>404</h1>
                <h2>The page you are trying to access does not exist...</h2>
                <Link href={'/'}>
                    <button className='btn bg-primary text-white'>Back to home</button>
                </Link>
                <Image src={'/not-found.svg'} width={50} height={50} className='w-full h-[500px]'/>
            </section>
        </div>
    </main>
  )
}

export default error