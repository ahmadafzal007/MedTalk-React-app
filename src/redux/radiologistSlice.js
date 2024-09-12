import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid' // For generating unique IDs

const initialState = {
  radiologists: [
    {
      id: 1,
      radiologistName: 'Dr. John Doe',
      email: 'john@example.com',
      sharedImages: [], // This will hold the datasets and images shared with the radiologist
    },
    {
      id: 2,
      radiologistName: 'Dr. Jane Smith',
      email: 'jane@example.com',
      sharedImages: [],
    },
  ],
}

const radiologistSlice = createSlice({
  name: 'radiologist',
  initialState,
  reducers: {
    // Register a new radiologist
    registerRadiologist: (state, action) => {
      state.radiologists.push({
        id: Date.now(),
        ...action.payload,
        sharedImages: [],
      })
    },

    // Delete a radiologist
    deleteRadiologist: (state, action) => {
      state.radiologists = state.radiologists.filter(
        (radiologist) => radiologist.id !== action.payload.id
      )
    },

    // Update radiologist details
    updateRadiologist: (state, action) => {
      const index = state.radiologists.findIndex(
        (radiologist) => radiologist.id === action.payload.id
      )
      if (index !== -1) {
        state.radiologists[index] = {
          ...state.radiologists[index],
          ...action.payload.updatedData,
        }
      }
    },

    // Share images with a radiologist
    shareImagesWithRadiologist: (state, action) => {
      const { radiologistId, datasetType, images } = action.payload
      const radiologist = state.radiologists.find((r) => r.id === radiologistId)

      if (radiologist) {
        // If radiologist exists, append the shared dataset and images
        const sharedImageData = {
          id: uuidv4(), // Generate a unique ID for this dataset
          datasetType, // Type of dataset (e.g., Chest, Kidney)
          images: images.map((image) => ({
            ...image,
            id: uuidv4(), // Assign a unique ID to each image
            classified: false, // Initially not classified
            classification: null, // No classification on share
          })),
        }

        radiologist.sharedImages.push(sharedImageData)
      } else {
        console.error(`No radiologist found with ID: ${radiologistId}`)
      }
    },

    // Classify an image
    classifyImage: (state, action) => {
      const { radiologistId, datasetId, imageId, classification } =
        action.payload
      const radiologist = state.radiologists.find((r) => r.id === radiologistId)

      if (radiologist) {
        const dataset = radiologist.sharedImages.find((d) => d.id === datasetId)

        if (dataset) {
          const image = dataset.images.find((img) => img.id === imageId)

          if (image) {
            image.classified = true
            image.classification = classification
          } else {
            console.error(`No image found with ID: ${imageId}`)
          }
        } else {
          console.error(`No dataset found with ID: ${datasetId}`)
        }
      } else {
        console.error(`No radiologist found with ID: ${radiologistId}`)
      }
    },
  },
})

export const {
  registerRadiologist,
  deleteRadiologist,
  updateRadiologist,
  shareImagesWithRadiologist,
  classifyImage,
} = radiologistSlice.actions

export default radiologistSlice.reducer
