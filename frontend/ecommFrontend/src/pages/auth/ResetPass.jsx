import React from 'react'
import Layout from '../../components/layouts/Layout'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {useNavigate, useLocation, Link, useParams} from 'react-router-dom';
import { useAuth } from '../../contextApi/auth';

const ResetPass = () => {

        const [newpassword, setNewPassword] = useState("");
        const navigate = useNavigate();
        const [auth, setAuth] = useAuth();
        const {id,forgotPassToken}= useParams


        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/auth/reset-pass/${id}/${forgotPassToken}`, { newpassword });
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
      <h2 className='register-title'><center>Reset Your Password</center></h2>  
        <div className="mb-3">
          <label  className="form-label">Password</label>
          <input type="password" value={newpassword} onChange={(e)=> setNewPassword(e.target.value)} required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter New Password'/>
          
        </div>
       
        <center><button type="submit" className="btn btn-primary submitformbtn">Change Password</button></center>
      </form>
            </div>
          </Layout>
        )
      }

export default ResetPass