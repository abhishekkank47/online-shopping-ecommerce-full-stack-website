import React from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'

const CreateProduct = () => {
  return (
    <>
    <Layout title="">     
    <div className='container-fluid'>
      <h1>Admin Panel</h1>
      <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
              <div className='card w-75 p-3'>
              <div>CreateProduct</div>     
                    
                    
              </div>
              
        </div>
      </div>
    </div>
     </Layout> 
    </>
  )
}

export default CreateProduct