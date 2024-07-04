import React from 'react'
import Layout from '../../components/layouts/Layout'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const navigate = useNavigate()
const handleSubmit = async (e)=>{
  e.preventDefault()
  try {
    const res= await axios.post('http://localhost:8000/api/v1/auth/register',{name,email,phone,password,address})
    if(res.data.success){
      toast.success(res.data.message)
      navigate('/login')
    }else{
      toast.error(res.data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error("Something Went Wrong")
  }
}

  return (
    <Layout>
      <div className='register-container'>
        <form className='reg-login-form' onSubmit={handleSubmit}>
        <h2 className='register-title'><center>Register to E-commerce Shop</center></h2>
  <div className="mb-3">
    <label  className="form-label">Name</label>
    <input type="name" value={name} onChange={(e)=> setName(e.target.value)} required className="form-control" id="exampleInputName" placeholder='Enter Your Full Name'/>
    
  </div> 
  <div className="mb-3">
    <label  className="form-label">Email address</label>
    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your Email Address'/>
    
  </div>
  <div className="mb-3">
    <label  className="form-label">Phone</label>
    <input type="phone" value={phone} onChange={(e)=> setPhone(e.target.value)} required className="form-control" id="exampleInputPhone" placeholder='Enter Your Phone Number'/>
    
  </div>
  <div className="mb-3">
    <label  className="form-label">Password</label>
    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password'/>
    
  </div>
  <div className="mb-3">
    <label  className="form-label">Address</label>
    <input type="address" value={address} onChange={(e)=> setAddress(e.target.value)} required className="form-control" id="exampleInputAddress1" placeholder='Enter Your Address'/>
    
  </div>
 
  <center><button type="submit" className="btn btn-primary submitformbtn">Register</button></center>
</form>
      </div>
    </Layout>
        
  )
}

export default RegisterPage