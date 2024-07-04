import React from 'react'
import UserMenu from '../../components/layouts/UserMenu'
import Layout from '../../components/layouts/Layout'
import { useAuth } from '../../contextApi/auth'
const Orders = () => {
    const[auth]=useAuth()
  return (
    <>
    <Layout title="Yours Orders">     
    <div className='container-fluid'>
    <h1>{auth?.user?.name}</h1>
      <div className='row'>
        <div className='col-md-3'>
            <UserMenu/>
        </div>
        <div className='col-md-9'>
              <div className='card w-75 p-3'>
              <div>Orders</div>     
                    
                    
              </div>
              
        </div>
      </div>
    </div>
     </Layout> 
    </>
  )
}

export default Orders