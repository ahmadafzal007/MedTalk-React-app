// redux/signupSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDoctor: false,
  profilePicture: null,
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  gender: '',
  medicalLicenseNumber: '',
  specialization: '',
  department: '',
  associatedHospital: '',
}

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setIsDoctor(state, action) {
      state.isDoctor = action.payload
    },
    setProfilePicture(state, action) {
      state.profilePicture = action.payload
    },
    setName(state, action) {
      state.name = action.payload
    },
    setEmail(state, action) {
      state.email = action.payload
    },
    setPassword(state, action) {
      state.password = action.payload
    },
    setConfirmPassword(state, action) {
      state.confirmPassword = action.payload
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload
    },
    setGender(state, action) {
      state.gender = action.payload
    },
    setMedicalLicenseNumber(state, action) {
      state.medicalLicenseNumber = action.payload
    },
    setSpecialization(state, action) {
      state.specialization = action.payload
    },
    setDepartment(state, action) {
      state.department = action.payload
    },
    setAssociatedHospital(state, action) {
      state.associatedHospital = action.payload
    },
  },
})

export const {
  setIsDoctor,
  setProfilePicture,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setPhoneNumber,
  setGender,
  setMedicalLicenseNumber,
  setSpecialization,
  setDepartment,
  setAssociatedHospital,
} = signupSlice.actions

export default signupSlice.reducer
