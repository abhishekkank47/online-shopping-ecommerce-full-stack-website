import React from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { useAuth } from '../../contextApi/auth'

const AdminDashboard = () => {
  const [auth]= useAuth()
  return (
    <Layout title= {'Admin Dashboard - E-COMMERCE SHOP' }>
    <div className='container-fluid'>
    <center><h1 className='panel-title'>Admin Panel</h1></center>
      <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
              <div className='card w-75 p-3'>
                    <h3>ADMIN NAME :- {auth?.user?.name}</h3>
                    <h3>ADMIN EMAIL ID :- {auth?.user?.email}</h3>
                    
                    
              </div>
              
        </div>
      </div>
    </div>
    

    </Layout>
  )
}

export default AdminDashboard