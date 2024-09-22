import React, { useState } from 'react'
import Sidebar from './Sidebar'
import AuthorizedDoctors from './AuthorizedDoctors'
import UnauthorizedDoctors from './UnauthorizedDoctors'
import DoctorSignup from './SignUp/SignUp'
import DoctorProfile from './DoctorProfile'

const MainComponent = () => {
  const [activeComponent, setActiveComponent] = useState('AuthorizedDoctors')
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  const renderComponent = () => {
    if (selectedDoctor) {
      return (
        <DoctorProfile
          doctor={selectedDoctor}
          onBack={() => setSelectedDoctor(null)}
        />
      )
    }

    switch (activeComponent) {
      case 'AuthorizedDoctors':
        return <AuthorizedDoctors onSelectDoctor={setSelectedDoctor} />
      case 'UnauthorizedDoctors':
        return <UnauthorizedDoctors />
      case 'Signup':
        return <DoctorSignup />
      default:
        return <AuthorizedDoctors />
    }
  }

  return (
    <div className='flex h-screen'>
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className='flex-grow p-4'>{renderComponent()}</div>
    </div>
  )
}

export default MainComponent
