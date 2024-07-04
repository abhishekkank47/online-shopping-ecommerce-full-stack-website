import React from 'react'
import Layout from '../components/layouts/Layout'
import { TbFaceIdError } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Layout>
      <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
        <h2 className='pnf-content'>Oops ! Page Not Found <TbFaceIdError /> </h2>
        <p>Look's like Page is Under Construction <IoWarningOutline /></p>
        <Link to='/' className='pnf-button'>
          Home page <FaHome />
        </Link>
      </div>
    </Layout>
  )
}

export default PageNotFound