import React from 'react'
import Layout from '../components/layouts/Layout'
import { useAuth } from '../contextApi/auth'

const HomePage = () => {
  const [auth,setAuth] = useAuth()
  return (
    <Layout>
  
          <pre>{JSON.stringify(auth,null,4)}</pre>
        
    </Layout>
  )
}

export default HomePage