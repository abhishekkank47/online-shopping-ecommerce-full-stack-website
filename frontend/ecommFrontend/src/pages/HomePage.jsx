import React,{useState,useEffect} from 'react'
import Layout from '../components/layouts/Layout'
import { useAuth } from '../contextApi/auth'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Checkbox } from 'antd'


const HomePage = () => {
  const [auth,setAuth] = useAuth()
  const [product,setProducts] = useState([])
  const [categories,setCategories] = useState([])

  // geting all categories
const getAllCategories = async ()=>{
  try {
    const {data}= await axios.get('http://localhost:8000/api/v1/category/all-category')
    if(data.success){
        setCategories(data?.category)
    }
  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
    getAllCategories()
},[])


  // handle filter category

  const handleFilter= (value,id)=>{
    let all =[...checked]
    if(value){
      all.push(id)
    }
  }

  //GET ALL PRODUCTS
  const getAllproducts= async ()=>{
    try {
      const {data} = await axios.get('http://localhost:8000/api/v1/product/all-product')
      setProducts(data.product)
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    getAllproducts()
  },[])
  return (
    <Layout title='ALL PRODUCTS'>
    <div className='row p-2'>
      <div className='col-md-3'>
      <h4 className='text-center m-3'>FILTER BY CATEGORIES</h4>
      <div className='d-flex flex-column'>
      {categories?.map((c)=>(
        <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checkbox)}>
          {c.name}
        </Checkbox>
      ))}
      </div>
      </div>
      <div className='col-md-9'>
      <h1 className='text-center admin-title'>ALL PRODUCTS</h1>
      <div className='d-flex flex-wrap'>
        {product?.map(p=>(
                            <>
                                <Link to={`/dashboard/admin/product/${p.slug}`} className='product-card-link'>
                                <div className="card product-card m-4" style={{width:" 18rem;"}} key={p._id}>
                                        <img src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <Link to="#" className="btn btn-primary ms-1">MORE INFO</Link>
                                        <Link to="#" className="btn btn-primary ms-1">ADD TO CART</Link>
                                    </div>
                                </div>
                                </Link> 
                            </>  
                        ))}
      </div>
      </div>
    </div>
        
    </Layout>
  )
}

export default HomePage