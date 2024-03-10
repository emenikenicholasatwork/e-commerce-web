import React, {useState} from 'react'
import './admindashboard.css'

const StatisticsCard = () => {
    const [revenueFilter, setRevenueFilter] = useState('today')
    const [saleFilter, setSaleFilter] = useState('today')
    const [customerFilter, setCustomerFilter] = useState('today')
    const [showSaleFilter, setShowSaleFilter] = useState(false)
    const [showCustomerFilter, setShowCustomerFilter] = useState(false)
    const [showRevenuFilter, setShowRevenueFilter] = useState(false)
  return (
    <div className='d-flex gap-3 flex-wrap flex-auto'>
        <div className='card p-3 w-72 shadow-md border-0 flex-auto'>
            <div className='d-flex justify-between'>
              <h5 className=''>Sales | <span className='text-md text-[#4154F1]'>{saleFilter}</span></h5>
              <i className='bi bi-three-dots relative cursor-pointer' onClick={(()=>{
                showSaleFilter ? setShowSaleFilter(false) : setShowSaleFilter(true)
              })}>
                <ul className={` popup dropdown-menu dropdown-menu-end dropdown-menu-arrow ${showSaleFilter && 'show'} absolute`}>
                  <li className='dropdown-header text-start text-[#AAB7CF] text-bold'><h6>Filter</h6></li>
                  <li className='dropdown-item cursor-pointer' onClick={(()=>{setSaleFilter('today')})}><a>Today</a></li>
                  <li className='dropdown-item cursor-pointer' onClick={(()=>{setSaleFilter('This month')})}><a>This month</a></li>
                  <li className='dropdown-item cursor-pointer' onClick={(()=>{setSaleFilter('This year')})}><a>This year</a></li>
                </ul>
              </i>
            </div>
            <div className='p-2 d-flex flex-row items-center gap-3'>
              <i className='bi bi-cart text-[#4154F1] bg-[#F6F6FE] text-4xl rounded-circle p-3'></i>
              <div>
                <h4 className='text-[#012970] font-bold m-0'>$3,264</h4>
                <h5><span className='text-success'>17%</span> increase</h5>
              </div>
            </div>
          </div>
          
          <div className='card p-3 w-72 shadow-md border-0 flex-auto'>
            <div className='d-flex justify-between'>
              <h5 className=''>Revenue | <span className='text-md text-[#4154F1]'>{revenueFilter}</span></h5>
              <i className='bi bi-three-dots relative cursor-pointer' onClick={(()=>{
                showRevenuFilter ? setShowRevenueFilter(false) : setShowRevenueFilter(true)
              })}>
                <ul className={` popup dropdown-menu dropdown-menu-end dropdown-menu-arrow ${showRevenuFilter && 'show'} absolute`}>
                  <li className='dropdown-header text-start text-[#AAB7CF] text-bold'><h6>Filter</h6></li>
                  <li className='dropdown-item cursor-pointer' onClick={(()=>{setRevenueFilter('today')})}><a>Today</a></li>
                  <li className='dropdown-item cursor-pointer' onClick={(()=>{setRevenueFilter('This month')})}><a>This month</a></li>
                  <li className='dropdown-item cursor-pointer' onClick={(()=>{setRevenueFilter('This year')})}><a>This year</a></li>
                </ul>
              </i>
            </div>
            <div className='p-2 d-flex flex-row items-center gap-3'>
              <i className='bi bi-currency-dollar text-[#2ECA6A] bg-[#E0F8E9] text-4xl rounded-circle p-3'></i>
              <div>
                <h4 className='text-[#012970] font-bold m-0'>$3,264</h4>
                <h5><span className='text-success'>8%</span> increase</h5>
              </div>
            </div>
          </div>
          
          <div className='card p-3 w-72 shadow-md border-0 flex-auto '>
            <div className='d-flex justify-between'>
              <h5 className=''>Customers | <span className='text-md text-[#4154F1]'>{customerFilter}</span></h5>
              <i className='bi bi-three-dots relative cursor-pointer' onClick={(()=>{
                showCustomerFilter ? setShowCustomerFilter(false) : setShowCustomerFilter(true)
              })}>
                <ul className={` popup dropdown-menu dropdown-menu-end dropdown-menu-arrow ${showCustomerFilter && 'show'} absolute`}>
                  <li className='dropdown-header text-start text-[#AAB7CF] text-bold'><h6>Filter</h6></li>
                  <li className='dropdown-item cursor-pointer' onClick={(()=>{setCustomerFilter('today')})}><a>Today</a></li>
                  <li className='dropdown-item cursor-pointer' onClick={(()=>{setCustomerFilter('This month')})}><a>This month</a></li>
                  <li className='dropdown-item cursor-pointer' onClick={(()=>{setCustomerFilter('This year')})}><a>This year</a></li>
                </ul>
              </i>
            </div>
            <div className='p-2 d-flex flex-row items-center gap-3'>
              <i className='bi bi-people text-[#FF771D] bg-[#FFECDF] text-4xl rounded-circle p-3'></i>
              <div>
                <h4 className='text-[#012970] font-bold m-0'>$3,264</h4>
                <h5><span className='text-danger'>-16%</span> decrease</h5>
              </div>
            </div>
          </div>
    </div>
  )
}

export default StatisticsCard