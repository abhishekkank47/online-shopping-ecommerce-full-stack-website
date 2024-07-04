import React from 'react'
import Layout from '../components/layouts/Layout'

const About = () => {
  return (
    <Layout>
        <div className="container text-center aboutUs">
  <div className="row">
    <div className="col">
    <img className='aboutus-img'src='/images/aboutusimg.jpg' alt='About us' ></img>
    </div>
    <div className="col">
    <h1 className='aboutus-title'>about us</h1>
    <p className='aboutus-content atu'> Your brand story
    Tell shoppers the origin story of your business and why you started it. For the most impact, make it memorable and personal, so customers relate and connect with your brand. If your brand is your name or it was formed based on a personal brand, your company’s story can be one and the same with your founder story.If your brand is your name or it was formed based on a personal brand, your company’s story can be one and the same with your founder story.</p>
    </div>
    
  </div>
</div>
    </Layout>
  )
}

export default About