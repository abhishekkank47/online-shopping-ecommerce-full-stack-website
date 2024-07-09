import React,{useState,useEffect} from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import {useNavigate, useParams } from 'react-router-dom' 

const {Option} = Select

const UpadteProduct = () => {

  const [categories,setCategories]= useState([])
  const [category,setCategory]= useState('')
  const [name,setName]= useState('')
  const [description,setDescription]= useState('')
  const [price,setPrice]= useState('')
  const [quantity,setQuantity]= useState('')
  const [photo,setPhoto]= useState('')
  const [shipping,setShipping]= useState('')
  const [id,setId]= useState('')
  const params = useParams()
  const navigate = useNavigate()

// geting single categories
const getSingleProduct = async ()=>{
  try {
    const {data}= await axios.get(`http://localhost:8000/api/v1/product/single-product/${params.slug}`)  
    setName(data.product.name) 
    setId(data.product._id)
    setDescription(data.product.description)
    setPrice(data.product.price)
    setQuantity(data.product.quantity)
    setPhoto(data.product.photo)
    setCategory(data.product.category._id)
  } catch (error) {
    console.log(error)
    toast.error("SOMTHING WENT WRONG IN GETTING PRODUCT")
  }
}
useEffect(()=>{
  getSingleProduct()
},[])

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
const handleUpdateProduct=async (e)=>{
e.preventDefault()
try {
  const productData = new FormData()
  productData.append('name',name)
  productData.append('description',description)
  productData.append('price',price)
  productData.append('quantity',quantity)
  photo && productData.append('photo',photo)
  productData.append('category',category)
  productData.append('shipping',shipping)
  const {data}= await axios.put(`http://localhost:8000/api/v1/product/update-product/${id}`, productData)  ////
  if(data?.success){
      toast.success(`PRODUCT ${data.name} UPDATED SUCESSFULLY`)
      navigate(`/dashboard/admin/product`)
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
              <center><h3 className='m-3'>UPDATE THE EXISTING PRODUCT</h3></center>
              <div className='m-1 w-80'>
                <Select 
                bordered={false} 
                placeholder='SELECT A CATEGORY' 
                size ='large' 
                showSearch
                className='form-select mb-3'
                onChange={(value)=>{setCategory(value)}}
                value={category}                                       //
                >
                {categories?.map(c=>(
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
                </Select>

                <div className='mb-3'>
                  <label  className='btn btn-primary '>
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
                
                {photo ? (
                  <div className='text-center'>
                    <img src={URL.createObjectURL(photo)} alt='product_photo' height={'200px'} className='img img-responsive'/>
                  </div>
                ) : (
                  <div className='text-center'>
                    <img src={`http://localhost:8000/api/v1/product/product-photo/${id}`} alt='product_photo' height={'200px'} className='img img-responsive'/>
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
                className='form-select mb-3'
                onChange={(value)=>{setShipping(value)}}
                value={shipping ? "YES" : "NO"}
                >
               <Option value='0'>NO</Option>
               <Option value='1'>YES</Option>
                </Select>

                <div className='mb-3'>
                <center><button className='btn btn-primary btn-createProduct' onClick={handleUpdateProduct}>UPDATE PRODUCT</button></center>
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

export default UpadteProduct