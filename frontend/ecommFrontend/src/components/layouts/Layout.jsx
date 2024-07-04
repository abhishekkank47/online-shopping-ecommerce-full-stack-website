import React from 'react'
import Headers from './Headers'
import Footer from './Footer'
import {Toaster} from 'react-hot-toast';

const Layout = (props) => {
  return (
    <div>
    <Headers></Headers>
        <main className="layout-content"style={{minHeight:'78vh'}}>
            {props.children}
            <Toaster/>
        </main>
    <Footer></Footer>    
    </div>
  )
}

export default Layout