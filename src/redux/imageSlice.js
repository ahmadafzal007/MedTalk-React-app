import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  images: [],
  datasetType: '',
}

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    uploadImages: (state, action) => {
      state.images = action.payload.images
      state.datasetType = action.payload.datasetType
    },
  },
})

export const { uploadImages } = imageSlice.actions
export default imageSlice.reducer
