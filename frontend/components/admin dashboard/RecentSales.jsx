import React,{useState} from 'react'
import './admindashboard.css'

const RecentSales = () => {
    const [filter, setFilter] = useState('today')
    const [showFilter, setShowFilter] = useState(false)
  return (
    <div className='card flex-col p-3 h-[00px]'>
        <div className='d-flex justify-between '>
            <h5 className=''>Recent Sales | <span className='text-md text-[#4154F1]'>{filter}</span></h5>
                <i className='bi bi-three-dots relative cursor-pointer' onClick={(()=>{
                    showFilter ? setShowFilter(false) : setShowFilter(true)
                })}>
               <ul className={` popup dropdown-menu dropdown-menu-end dropdown-menu-arrow ${showFilter && 'show'} absolute`}>
               <li className='dropdown-header text-start text-[#AAB7CF] text-bold'><h6>Filter</h6></li>
                <li className='dropdown-item cursor-pointer' onClick={(()=>{setFilter('today')})}><a>Today</a></li>
                <li className='dropdown-item cursor-pointer' onClick={(()=>{setFilter('This month')})}><a>This month</a></li>
                <li className='dropdown-item cursor-pointer' onClick={(()=>{setFilter('This year')})}><a>This year</a></li>
                </ul>
            </i>
        </div>
        <div className='h-[400px] overflow-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className=''>
                            <th>#</th>
                            <th>customer</th>
                            <th>product</th>
                            <th>price</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href='#' className='no-underline'>#29279</a></td>
                            <td>Nicholas Emenike</td>
                            <td>Gucci system</td>
                            <td>$77</td>
                            <td className='bg-success text-white text-center rounded-md'>Approved</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </div>
  )
}

export default RecentSales