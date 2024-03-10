import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ItemCard from '@/components/user components/ItemCard'
import Link from 'next/link'
import '@fortawesome/fontawesome-free/css/all.css'

export default function Home() {
  return (
    <main className="">
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
                    <Link href={'/auth/login'} className='no-underline flex md:hidden flex-row w-full align-items-center m-0 p-0'>
                        <p className='m-0 text-xl font-semibold text-black'>Sign In</p>
                    </Link>
            </div>
            <div className=' gap-2 hidden md:flex flex-row justify-content-center align-items-center cursor-pointer w-4/12'>
                
                <div className='flex flex-row justify-content-center align-items-center gap-2'>
                  <Link href={'/auth/register'}>
                    <button className='hover:opacity-80 shadow-md rounded-md bg-primary text-white font-bold p-3 w-[150px]'>Register</button>
                  </Link>
                  <Link href={'/auth/login'}>
                    <button className='hover:opacity-80 shadow-md rounded-md bg-primary text-white font-bold p-3 w-[150px]'>Login</button>
                  </Link>
                </div>
            </div>
        </header>
        <div className='h-[80px] w-full '></div>
        <div className='bg-[#f9f6FF] fixed flex flex-wrap gap-2 overflow-auto h-full w-full p-5 pb-5 '>
          <ItemCard/>
        </div>
    </main>
  )
}
