import React,{useState,useEffect} from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import {useNavigate } from 'react-router-dom' 

const {Option} = Select

const CreateProduct = () => {
  const [categories,setCategories]= useState([])
  const [category,setCategory]= useState('')
  const [name,setName]= useState('')
  const [description,setDescription]= useState('')
  const [price,setPrice]= useState('')
  const [quantity,setQuantity]= useState('')
  const [photo,setPhoto]= useState('')
  const [shipping,setShipping]= useState('')

  const navigate = useNavigate()

// geting all categories
const getAllCategories = async ()=>{
  try {
    const {data}= await axios.get('http://localhost:8000/api/v1/category/all-category')
    if(data.success){
        setCategories(data?.category)
    }
  } catch (error) {
    console.log(error)
    toast.error("SOMTHING WENT WRONG IN GETTING CATEGORIES")
  }
}

useEffect(()=>{
  getAllCategories()
},[])

//handle product creation
const handleCreateProduct=async (e)=>{
e.preventDefault()
try {
  const productData = new FormData()
  productData.append('name',name)
  productData.append('description',description)
  productData.append('price',price)
  productData.append('quantity',quantity)
  productData.append('photo',photo)
  productData.append('category',category)
  productData.append('shipping',shipping)
  const {data}= await axios.post('http://localhost:8000/api/v1/product/create-product', productData)
  if(data?.success){
      toast.success(`PRODUCT ${data.name} CREATED SUCESSFULLY`)
      navigate(`/dashboard/admin/products`)
  }
} catch (error) {
  console.log(error)
  toast.error('SOMETIHNG WENT WRONG WHILE CREATING PRODUCT')
  error
}
}

  return (
    <>
    <Layout title="">     
    <div className='container-fluid'>
    <h1 className='admin-title'>ADMIN PANEL</h1>
      <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
              <div className='card w-80 p-3 mb-2 admin-content'>
              <center><h3 className='m-3'>CREATE A NEW PRODUCT</h3></center>
              <div className='m-1 w-80'>
                <Select 
                bordered={false} 
                placeholder='SELECT A CATEGORY' 
                size ='large' 
                showSearch
                className='form-select mb-3'
                onChange={(value)=>{setCategory(value)}}>
                {categories?.map(c=>(
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
                </Select>

                <div className='mb-3'>
                  <label  className='btn btn-primary btn-uploadPhoto '>
                  {photo ? photo.name : "Upload Product Photo"}
                    <input 
                    type='file' 
                    name='photo' 
                    accept='image/*' 
                    onChange={(e)=> setPhoto(e.target.files[0])} 
                    hidden
                    />
                  </label>
                <div className='mb-3'>
                {photo && (
                  <div className='text-center'>
                    <img src={URL.createObjectURL(photo)} alt='product_photo' height={'200px'} className='img img-responsive'/>
                  </div>
                )}
                </div>
                <div className='mb-3'>
                <input type='text' placeholder='WRITE PRODUCT TITLE' className='form-control' value={name} onChange={(e)=>{ setName(e.target.value)}}/>

                </div>

                <div className='mb-3'>
                <textarea type='text' placeholder='WRITE PRODUCT DESCRIPTION' className='form-control' value={description} onChange={(e)=>{ setDescription(e.target.value)}}/>

                </div>

                <div className='mb-3'>
                <input type='number' placeholder='WRITE PRODUCT PRICE' className='form-control' value={price} onChange={(e)=>{ setPrice(e.target.value)}}/>

                </div>

                <div className='mb-3'>
                <input type='number' placeholder='WRITE PRODUCT QUANTITY' className='form-control' value={quantity} onChange={(e)=>{ setQuantity(e.target.value)}}/>

                </div>

                <Select 
                bordered={false} 
                placeholder='SELECT SHIPPING' 
                size ='large' 
                showSearch
                className='form-select mb-3 select-productCreate'
                onChange={(value)=>{setShipping(value)}}>
               <Option value='0'>NO</Option>
               <Option value='1'>YES</Option>
                </Select>

                <div className='mb-3'>
                <center><button className='btn btn-primary btn-createProduct' onClick={handleCreateProduct}>CREATE PRODUCT</button></center>
                </div>
                </div>
              </div>     
                    
                    
              </div>
              
        </div>
      </div>
    </div>
     </Layout> 
    </>
  )
}

export default CreateProduct