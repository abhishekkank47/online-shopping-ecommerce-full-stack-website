import {Routes,Route} from 'react-router-dom'
import { useState } from 'react'
import Homepage from './pages/HomePage.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import Policy from './pages/Policy.jsx'
import RegisterPage from './pages/auth/RegisterPage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import Dashboard from './pages/user/Dashboard.jsx'
import PrivateRoutes from './components/layouts/routes/PrivateRoutes.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPass from './pages/auth/ResetPass.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminPrivateRoute from './components/layouts/routes/AdminPrivateRoutes.jsx'
import CreateCategory from './pages/admin/CreateCategory.jsx'
import CreateProduct from './pages/admin/CreateProduct.jsx'
import Users from './pages/admin/Users.jsx'
import Orders from './pages/user/Orders.jsx'
import Profile from './pages/user/Profile.jsx'
import Products from './pages/admin/Products.jsx'
import UpadteProduct from './pages/admin/UpadteProduct.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-pass/:id/:forgotPassToken' element={<ResetPass/>}/>
      <Route path='/dashboard' element ={<PrivateRoutes/>}>
        <Route path="user" element={<Dashboard/>}/>
        <Route path="user/orders" element={<Orders/>}/>
        <Route path="user/profile" element={<Profile/>}/>
      </Route>
      <Route path='dashboard' element={<AdminPrivateRoute/>}>
        <Route path="admin" element={<AdminDashboard/>}/>
        <Route path="admin/create-category" element={<CreateCategory/>}/>
        <Route path="admin/create-products" element={<CreateProduct/>}/>
        <Route path="admin/product/:slug" element={<UpadteProduct/>}/>
        <Route path="admin/products" element={<Products/>}/>
        <Route path="admin/users" element={<Users/>}/>
      </Route>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  </>
  )
}

export default App
