import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../contextApi/auth'

const Dashboard = () => {
  const [auth]= useAuth()
  return (
<Layout title= {'Dashboard - E-COMMERCE SHOP' }>
    <div className='container-fluid'>
      <h1>Dashboard</h1>
      <div className='row'>
        <div className='col-md-3'>
            <UserMenu/>
        </div>
        <div className='col-md-9'>
              <div className='card w-75 p-3'>
              <h3>USER NAME :- {auth?.user?.name}</h3>
              <h3>EMAIL ID :- {auth?.user?.email}</h3>
              <h3>PHONE NO :- {auth?.user?.phone}</h3>
              <h3>ADDRESS :- {auth?.user?.address}</h3>       
              </div>
              
        </div>
      </div>
    </div>
    </Layout> 
  )
}

export default Dashboard