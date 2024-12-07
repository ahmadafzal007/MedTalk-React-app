import React, { useState } from 'react'
import RadiologistPageSidebar from '../components/Radiologist/RadiologistPageSidebar' // Adjust path as necessary
import Main from '../components/Radiologist/Main' // Adjust path as necessary

const RadiologistData = () => {
  const [activeScreen, setActiveScreen] = useState('') // Default to empty string

  return (
    <div className='flex'>
      {/* Sidebar to navigate to different screens */}
      <RadiologistPageSidebar setActiveScreen={setActiveScreen} />

      {/* Main screen that renders the dashboard or other screens */}
      <Main
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
      />
    </div>
  )
}

export default RadiologistData

