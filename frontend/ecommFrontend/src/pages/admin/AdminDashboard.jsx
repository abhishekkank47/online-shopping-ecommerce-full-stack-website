import React from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { useAuth } from '../../contextApi/auth'
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineAttachEmail } from "react-icons/md";

const AdminDashboard = () => {
  const [auth]= useAuth()
  return (
    <Layout title= {'Admin Dashboard - E-COMMERCE SHOP' }>
    <div className='container-fluid'>
    <center><h1 className='admin-title'>ADMIN PANEL</h1></center>
      <div className='row'>
        <div className='col-md-3 '>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
              <div className='card w-80 p-5 admin-content'>
              
                    <h3 className='ms-5'><RiAdminLine /> ADMIN NAME : {auth?.user?.name}</h3>
                    <h3 className='ms-5'><MdOutlineAttachEmail /> ADMIN EMAIL ID : {auth?.user?.email}</h3>
                    
                    
              </div>
              
        </div>
      </div>
    </div>
    

    </Layout>
  )
}

export default AdminDashboard