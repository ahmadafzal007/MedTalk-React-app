import React from 'react'
import RegisterHospital from './RegisterHospital'
import ApproveHospitals from './ApproveHospitals'
import TrainModel from './TrainModel'
import UnauthorizedHospitals from './UnauthorizedHospitals'
import UnprocessedDatasets from './UnprocessedDatasets'
import Datasets from './Datasets'
import RegisteredHospitals from './RegisteredHospitals'
import RegisterRadiologist from './RegisterRadiologist'
import RadiologistPage from '../Radiologist/RadiologistPage' // Import RadiologistPage component
import DashboardOverview from './DashboardOverview'

const MainScreen = ({ activeScreen, setActiveScreen }) => {
  return (
    <div className='flex-1 p-8 bg-black'>
      {!activeScreen && <DashboardOverview setActiveScreen={setActiveScreen} />}
      {activeScreen === 'RegisterHospital' && <RegisterHospital />}
      {activeScreen === 'ApproveHospitals' && <ApproveHospitals />}
      {activeScreen === 'TrainModel' && <TrainModel />}
      {activeScreen === 'UnauthorizedHospitals' && <UnauthorizedHospitals />}
      {activeScreen === 'UnprocessedDatasets' && <UnprocessedDatasets />}
      {activeScreen === 'Datasets' && <Datasets />}
      {activeScreen === 'RegisteredHospitals' && <RegisteredHospitals />}
      {activeScreen === 'RegisterRadiologist' && <RegisterRadiologist />}
      {activeScreen === 'RadiologistPage' && <RadiologistPage />}{' '}
      {/* Add RadiologistData */}
    </div>
  )
}

export default MainScreen
