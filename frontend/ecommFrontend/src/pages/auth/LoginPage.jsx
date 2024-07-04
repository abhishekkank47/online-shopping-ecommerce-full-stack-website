import React from 'react'
import Layout from '../../components/layouts/Layout'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import { useAuth } from '../../contextApi/auth';

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const [auth,setAuth] = useAuth()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res= await axios.post('http://localhost:8000/api/v1/auth/login',{email,password})
      if(res.data.success){
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        })
        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate(location.state || '/')
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
<h2 className='register-title'><center>Login to E-commerce Shop</center></h2>  
  <div className="mb-3">
    <label  className="form-label">Email address</label>
    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your Email Address'/>
    
  </div>
  <div className="mb-3">
    <label  className="form-label">Password</label>
    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password'/>
    
  </div>
 
  <center><button type="submit" className="btn btn-primary submitformbtn">Login</button></center>
  <center><small><Link to={'/forgot-password'} className='forgotPass'>Forgot Password ? Reset</Link></small></center>
</form>
      </div>
    </Layout>
  )
}

export default LoginPage