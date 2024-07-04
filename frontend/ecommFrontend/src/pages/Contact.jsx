import React from 'react'
import Layout from '../components/layouts/Layout'
import { TfiEmail } from "react-icons/tfi";
import { CgPhone } from "react-icons/cg";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdMegaphone } from "react-icons/io";
import { FaRegFaceSmileBeam } from "react-icons/fa6";



const Contact = () => {
  return (
    <Layout>
        <div className="container text-center contactus">
  <div className="row">
    <div className="col">
      
      <img className='contactus-img'src='/images/contactusimg.png' alt='contact us' ></img>
    </div>
    <div className="col">
      <h1 className='contactus-title'>contact us</h1>
      <p className='contactus-content ctu'>Any Query About Product Feel Free To Ask.<br/> We Are Commited 24x7 For Resolved Your Problem. <FaRegFaceSmileBeam /></p>
      <p className='contactus-content '><TfiEmail /> EMAIL ID : abhishekkank5@gmail.com</p>
      <p className='contactus-content '><CgPhone /> PHONE NO. :  +91 7387517150</p>
      <p className='contactus-content '><IoMdMegaphone /> TOLL FREE NO. : 1800 000 0000</p>
      <p className='contactus-content '><FaMapLocationDot /> LOCATION : India, Maharashtra, Pune, Kothrud - 411 038</p>
    
      
    </div>

  </div>
</div>
    </Layout>
  )
}

export default Contact