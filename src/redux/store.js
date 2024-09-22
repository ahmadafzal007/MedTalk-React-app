import { configureStore } from '@reduxjs/toolkit'
import hospitalReducer from './hospitalSlice'
import radiologistReducer from './radiologistSlice'
import patientReducer from './patientSLice'
import signupReducer from './signupSlice'
import doctorReducer from './doctorSlice'
export const store = configureStore({
  reducer: {
    hospital: hospitalReducer,
    radiologist: radiologistReducer,
    patients: patientReducer,
    signup: signupReducer,
    doctors: doctorReducer,
    // Add more reducers if needed
  },
})

export default store
