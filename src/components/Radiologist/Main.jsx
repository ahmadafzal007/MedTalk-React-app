import React from 'react'
import Unprocessedxray from './unprocessed_xray_data'



const Main = ({ activeScreen, setActiveScreen }) => {
  return (
    <div className='flex-1 p-8 bg-black'>
      {!activeScreen && <Unprocessedxray setActiveScreen={setActiveScreen} />}
      {activeScreen === 'Unprocessedxray' && <Unprocessedxray />}
      {/* {activeScreen === 'UnauthorizedHospitals' && <UnauthorizedHospitals />}
      {activeScreen === 'UnprocessedDatasets' && <UnprocessedDatasets />}
      {activeScreen === 'Datasets' && <Datasets />}
      {activeScreen === 'RegisteredHospitals' && <RegisteredHospitals />}
      {activeScreen === 'RegisterRadiologist' && <RegisterRadiologist />}
      {activeScreen === 'RadiologistPage' && <RadiologistPage />}
      {activeScreen === 'RegisteredRadiologists' && <RegisteredRadiologist />}       */}

      {' '}
      {/* Add RadiologistData */}
    </div>
  )
}

export default Main
