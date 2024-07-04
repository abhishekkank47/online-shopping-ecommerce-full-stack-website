import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../contextApi/auth'
const Profile = () => {
    const[auth]=useAuth()
  return (
    <>
    <Layout title="Yours Profile">     
    <div className='container-fluid'>
      <h1>{auth?.user?.name}</h1>
      <div className='row'>
        <div className='col-md-3'>
            <UserMenu/>
        </div>
        <div className='col-md-9'>
              <div className='card w-75 p-3'>
              <div>Profile</div>     
                    
                    
              </div>
              
        </div>
      </div>
    </div>
     </Layout> 
    </>
  )
}

export default Profile