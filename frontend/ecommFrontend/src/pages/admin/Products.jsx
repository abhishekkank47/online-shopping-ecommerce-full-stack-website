// need to add delete and fix update

import React,{useEffect,useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast' 
import AdminMenu from '../../components/layouts/AdminMenu'
import Layout from '../../components/layouts/Layout'
import { Link} from 'react-router-dom'

const Products = () => {
    const[product,setProduct]= useState([])

    // get all products
    const getAllProducts = async (req,res)=>{
        try {
            const {data} = await axios.get("http://localhost:8000/api/v1/product/all-product")
            setProduct(data.product)
        } catch (error) {
            console.log(error)
            toast.error("SOMETHING WENT WRONG WHILE SHOWING PRODUCTS")
            error
        }
    }
    // setting products
    useEffect(()=>{
        getAllProducts()
    },[])

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
              <div className='card w-80 p-2 admin-content'>
                    <center><h3 className='m-2'>ALL PRODUCTS LISTS</h3></center>
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
      </div>
    </div>
     </Layout> 
    </>
  )
}

export default Products