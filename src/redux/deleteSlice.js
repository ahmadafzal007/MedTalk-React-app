import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  hospitals: [],
}

const hospitalSlice = createSlice({
  name: 'hospital',
  initialState,
  reducers: {
    registerHospital: (state, action) => {
      state.hospitals.push({
        id: Date.now(), // Assign unique ID using current timestamp
        ...action.payload,
      })
    },
    deleteHospital: (state, action) => {
      state.hospitals = state.hospitals.filter(
        (hospital) => hospital.id !== action.payload.id
      )
    },
  },
})

export const { registerHospital, deleteHospital } = hospitalSlice.actions
export default hospitalSlice.reducer
