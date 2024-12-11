import React from 'react'
import Unprocessedxray from './unprocessed_xray_data'
import UnprocessedKidneyScan from './unprocessed_scan_data'
import ProcessedKidneyScanNormal from './normalkidney'
import ProcessedKidneyScanCyst from './cystkidney'
import ProcessedKidneyScanTumor from './kidneytumor'
import ProcessedKidneyScanStone from './kidneystone'
import ProcessedChestXrayNormal from './chestnormal'
import ProcessedChestXrayCovid from './chestcovid'
import ProcessedChestXrayPneumonia from './chestpneumonia'
import ProcessedChestXrayTuberculosis from './chesttb'

const Main = ({ activeScreen, setActiveScreen }) => {
  return (
    <div className='flex-1 p-8 bg-black'>
      {!activeScreen && <UnprocessedKidneyScan setActiveScreen={setActiveScreen} />}
      {activeScreen === 'Unprocessedxray' && <Unprocessedxray />}
      {activeScreen === 'UnprocessedKidneyScan' && <UnprocessedKidneyScan />}
      {activeScreen === 'ProcessedKidneyScanNormal' && <ProcessedKidneyScanNormal />}
      {activeScreen === 'ProcessedKidneyScanCyst' && <ProcessedKidneyScanCyst />}
      {activeScreen === 'ProcessedKidneyScanTumor' && <ProcessedKidneyScanTumor />}
      {activeScreen === 'ProcessedKidneyScanStone' && <ProcessedKidneyScanStone />}
      {activeScreen === 'ProcessedChestXrayNormal' && <ProcessedChestXrayNormal />}
      {activeScreen === 'ProcessedChestXrayCovid' && <ProcessedChestXrayCovid />}
      {activeScreen === 'ProcessedChestXrayPneumonia' && <ProcessedChestXrayPneumonia/>}
      {activeScreen === 'ProcessedChestXrayTuberculosis' && <ProcessedChestXrayTuberculosis />}


    </div>
  )
}

export default Main
