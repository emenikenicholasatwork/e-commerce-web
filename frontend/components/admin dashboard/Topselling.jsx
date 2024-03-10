import Image from 'next/image'
import React,{useState} from 'react'

const Topselling = () => {
    const [filter, setFilter] = useState('today')
    const [showFilter, setShowFilter] = useState(false)
  return (
    <div className='card p-3'>
        <div className='d-flex justify-between'>
                <h5 className=''>Top Selling | <span className='text-md text-[#4154F1]'>{filter}</span></h5>
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
                            <th>Preview</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Sold</th>
                            <th>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Image width={70} className='shadow-md' height={50} src={'/laptop3.jpeg'}/></td>
                            <td>Dell latitude 4680</td>
                            <td>$88</td>
                            <td>177</td>
                            <td>$6,878</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </div>
  )
}

export default Topselling