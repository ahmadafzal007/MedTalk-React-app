import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  unauthorizedDoctors: [],
  authorizedDoctors: [],
}

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    addUnauthorizedDoctor: (state, action) => {
      state.unauthorizedDoctors.push(action.payload)
    },
    approveDoctor: (state, action) => {
      const doctor = state.unauthorizedDoctors.find(
        (doc) => doc.email === action.payload
      )
      if (doctor) {
        state.unauthorizedDoctors = state.unauthorizedDoctors.filter(
          (doc) => doc.email !== action.payload
        )
        state.authorizedDoctors.push(doctor)
      }
    },
    declineDoctor: (state, action) => {
      state.unauthorizedDoctors = state.unauthorizedDoctors.filter(
        (doc) => doc.email !== action.payload
      )
    },
  },
})

export const { addUnauthorizedDoctor, approveDoctor, declineDoctor } =
  doctorSlice.actions
export default doctorSlice.reducer
