"use client"
import axios from 'axios'
import React, { useRef, useState } from 'react'

const page = () => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name:'',
    brand:'',
    price:'',
    available:'',
    description:''
  })
  const inputChanged=(e)=>{
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value
    })
    setIsFormValid(false)
  }
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)
  const images1Ref = useRef(null)
  const images2Ref = useRef(null)
  const images3Ref = useRef(null)
  const images4Ref = useRef(null)
  const image1Clicked =()=>{
    images1Ref.current.click()
  }
  const image2Clicked =()=>{
    images2Ref.current.click()
  }
  const image3Clicked =()=>{
    images3Ref.current.click()
  }
  const image4Clicked =()=>{
    images4Ref.current.click()
  }
  const imagesChanged =(e)=>{
    e.target.name === '1' && (()=>{
      const reader = new FileReader()
      if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0])
        reader.onload=(e)=>{
          setImage1(e.target.result)
        }
      }
    })()
    e.target.name === '2' && (()=>{
      const reader = new FileReader()
      if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0])
        reader.onload=(e)=>{
          setImage2(e.target.result)
        }
      }
    })()
    e.target.name === '3' && (()=>{
      const reader = new FileReader()
      if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0])
        reader.onload=(e)=>{
          setImage3(e.target.result)
        }
      }
    })()
    e.target.name === '4' && (()=>{
      const reader = new FileReader()
      if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0])
        reader.onload=(e)=>{
          setImage4(e.target.result)
        }
      }
    })()
    
  }

  const checkFormValidation=()=>{
    if(image1===null){
      setIsFormValid(true)
      return false
    }if(image2===null){
      setIsFormValid(true)
      return false
    }if(image3===null){
      setIsFormValid(true)
      return false
    }if(image4===null){
      setIsFormValid(true)
      return false
    }if(productDetails.name.length===0){
      setIsFormValid(true)
      return false
    }if(productDetails.brand.length===0){
      setIsFormValid(true)
      return false
    }if(productDetails.available.length===0){
      setIsFormValid(true)
      return false
    }if(productDetails.description.length===0){
      setIsFormValid(true)
      return false
    }
    setIsFormValid(false)
    return true
  }

  const submit = async (e)=>{
    setIsFormValid(false)
    e.preventDefault()
    const formData = new FormData()
    if(checkFormValidation()){
      formData.append('name', productDetails.name)
      formData.append('brand', productDetails.brand)
      formData.append('description', productDetails.description)
      formData.append('price', productDetails.price)
      formData.append('available', productDetails.available)
      formData.append('image1', image1)
      formData.append('image2', image2)
      formData.append('image3', image3)
      formData.append('image4', image4)
      const response = await axios.post('http://localhost:8080/api/v1/admin/item/add',formData,{
        headers: {Accept: "application/json"}
      })
      console.log(response)
    }
    
  }

  return (
    <div className='h-full w-full hidden xl:block'>
          <h3 className='m-0 fixed font-bold p-2 top-[75px] z-50 h-10 w-full bg-[#f6f9FF]'>
            New Product
          </h3>
          {isFormValid && <h3 className='m-0 fixed justify-content-center w-full d-flex text-danger font-bold p-2 top-[75px] z-50 h-10'>
            The Form must be filled accurately
          </h3>}
          <form className='w-full p-5 gap-5 d-flex flex-col'>
            <div className='gap-5 d-flex flex-row'>
              <div className='w-full gap-5 d-flex flex-auto flex-col'>
                <div className='flex flex-col'>
                    <p className='font-bold text-lg'>Main Image</p>
                    <div className='w-[200px] h-[200px] newProductImage cursor-pointer'>
                      <img src={image1} onClick={(()=>{image1Clicked()})} className='w-[200px] rounded-md h-[200px] newProductImage cursor-pointer'/>
                      <input name='1' type='file' accept='image/*' ref={images1Ref} onChange={imagesChanged} className='d-none'/>
                  </div>
                </div>
                <div className='d-flex flex-row gap-3'>
                  <div className='w-[200px] h-[200px] newProductImage cursor-pointer'>
                    <img src={image2} onClick={(()=>{image2Clicked()})} className='w-[200px] rounded-md h-[200px] newProductImage cursor-pointer'/>
                    <input name='2' type='file' accept='image/*' ref={images2Ref} onChange={imagesChanged} className='d-none'/>
                  </div>
                  <div className='w-[200px] h-[200px] newProductImage cursor-pointer'>
                    <img src={image3} onClick={(()=>{image3Clicked()})} className='w-[200px] rounded-md h-[200px] newProductImage cursor-pointer'/>
                    <input name='3' type='file' accept='image/*' ref={images3Ref} onChange={imagesChanged} className='d-none'/>
                  </div>
                  <div className='w-[200px] h-[200px] newProductImage cursor-pointer'>
                    <img src={image4} onClick={(()=>{image4Clicked()})} className='w-[200px] rounded-md h-[200px] newProductImage cursor-pointer'/>
                    <input name='4' type='file' accept='image/*' ref={images4Ref} onChange={imagesChanged} className='d-none'/>
                  </div>
                </div>
              </div>

              <div className='d-flex flex-col h-[20px] gap-3 flex-auto w-full justify-content-between'>
                  <div className='d-flex flex-col'>
                      <label htmlFor='name' className='font-bold text-lg'>Product Name</label>
                      <input onChange={inputChanged} className='p-3 font-bold shadow-md rounded-md' required name='name' placeholder='Latitude 8460'/>
                  </div>
                  <div className='d-flex flex-col'>
                      <label htmlFor='brand' className='font-bold text-lg'>Brand Name</label>
                      <input onChange={inputChanged} className='p-3 font-bold shadow-md rounded-md' required name='brand' placeholder='DELL'/>
                  </div>
                  <div className='d-flex flex-row w-full gap-2'>
                    <div className='d-flex flex-col w-full'>
                      <label htmlFor='price' className='font-bold text-lg'>Product Price</label>
                      <input onChange={inputChanged} className='p-3 font-bold shadow-md rounded-md' type='number' required name='price' placeholder='$ 540,000.00'/>
                    </div>
                    <div className='d-flex flex-col w-full'>
                      <label htmlFor='available' className='font-bold text-lg'>Amount Avaliable</label>
                      <input onChange={inputChanged} className='p-3 font-bold shadow-md rounded-md' required name='available' type='number' placeholder='70'/>
                    </div>
                  </div>
                  <div className='d-flex flex-col w-full'>
                      <label htmlFor='description' className='font-bold text-lg'>Description</label>
                      <textarea className='resize-none p-3 font-bold shadow-md rounded-md' onChange={inputChanged} required name='description' placeholder='Say something about the product....'/>
                  </div>
              </div>
            </div>
            <button className='bg-primary w-[20%] p-3 text-white font-bold text-lg rounded-md submitProduct' type='submit' onClick={(e)=>{submit(e)}}>Submit</button>
          </form>
    </div>
  )
}

export default page