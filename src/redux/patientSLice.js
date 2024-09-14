import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  patientList: [], // Store patient data here
}
// Initialize Marry
const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient: (state, action) => {
      state.patientList.push(action.payload) // Add new patient to the list
    },
  },
})

export const { addPatient } = patientSlice.actions
export default patientSlice.reducer
