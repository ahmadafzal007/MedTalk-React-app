import React, { useState } from 'react'
import Sidebar from '../../components/AdminDashboard/Sidebar'
import MainScreen from '../../components/AdminDashboard/MainScreen'

const Dashboard = () => {
  const [activeScreen, setActiveScreen] = useState('') // Default to empty string

  return (
    <div className='flex'>
      {/* Sidebar to navigate to different screens */}
      <Sidebar setActiveScreen={setActiveScreen} />

      {/* Main screen that renders the dashboard or other screens */}
      <MainScreen
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
      />
    </div>
  )
}

export default Dashboard
