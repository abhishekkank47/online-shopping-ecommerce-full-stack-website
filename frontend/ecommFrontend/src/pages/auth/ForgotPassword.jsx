import React from 'react'
import Layout from '../../components/layouts/Layout'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import { useAuth } from '../../contextApi/auth';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("")
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [auth,setAuth] = useAuth()

//   const handleSubmit = async (e)=>{
//     e.preventDefault()
//     try {
//       const res= await axios.post('http://localhost:8000/api/v1/auth/forgot-password',{email})
//       if(res.data.success){
//         console.log('data sucesses')
//         toast.success(res.data.message)
//         setAuth({
//           ...auth,
//           user:res.data.user,
//           forgotPassToken:res.data.forgotPassToken                                                                                                                                      
//         })
//         localStorage.setItem('auth',JSON.stringify(res.data))
//         navigate(location.state || '/login')
//       }else{
//         toast.error(res.data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error("Something Went Wrong")
//     }
//   }

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post('http://localhost:8000/api/v1/auth/forgot-password', { email });
          if (res && res.data.success) {
              toast.success(res.data && res.data.message);
              setAuth({
                  ...auth,
                  user: res.data.user,
                  forgotPassToken: res.data.forgotPassToken
              });
              localStorage.setItem('auth',JSON.stringify(res.data))
              navigate('/login')
          } else {
              toast.error(res.data.message);
          }
      } catch (error) {
          console.log(error);
          toast.error("Something Went Wrong");
      }
  }


  return (
    <Layout>
      <div className='register-container'>

        <form className='reg-login-form' onSubmit={handleSubmit}>
<h2 className='register-title'><center>Verify Registered Email-ID</center></h2>  
  <div className="mb-3">
    <label  className="form-label">Email address</label>
    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your Email Address'/>
    
  </div>
 
  <center><button type="submit" className="btn btn-primary submitformbtn">Send OTP</button></center>
</form>
      </div>
    </Layout>
  )
}

export default ForgotPassword