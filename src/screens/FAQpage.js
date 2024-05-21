import React from 'react'
import FAQ from '../components/FAQ/FAQ.js'
import Header from '../components/FAQ/FAQnav.js'
import ParticlesComponent from '../components/Welcome/particles.js'
const FAQpage = () => {
  return (
    <div>
        <div >
        <ParticlesComponent id="particles"/>
        <Header />
        </div>
      <div>
        <FAQ/>
      </div> 
    </div>
  )
}

export default FAQpage
