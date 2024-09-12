import { configureStore } from '@reduxjs/toolkit'
import hospitalReducer from './hospitalSlice'
import radiologistReducer from './radiologistSlice'
import patientReducer from './patientSlice'
export const store = configureStore({
  reducer: {
    hospital: hospitalReducer,
    radiologist: radiologistReducer,
    patients: patientReducer,
    // Add more reducers if needed
  },
})

export default store
