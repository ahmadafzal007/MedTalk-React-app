import React, { useState } from 'react'
import JSZip from 'jszip' // To handle zip files
import { useSelector, useDispatch } from 'react-redux'
import { shareImagesWithRadiologist } from '../../redux/radiologistSlice' // Redux action to share images

const UnprocessedDatasets = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageFiles, setImageFiles] = useState([]) // Store extracted image files
  const [datasetType, setDatasetType] = useState('') // Store selected dataset type (Chest/Kidney)
  const [selectedRadiologist, setSelectedRadiologist] = useState('') // Track the selected radiologist

  const radiologists = useSelector((state) => state.radiologist.radiologists) // Get radiologists from Redux
  const dispatch = useDispatch()

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  // Handle dataset type change (Chest or Kidney)
  const handleDatasetTypeChange = (e) => {
    setDatasetType(e.target.value)
  }

  // Handle file upload and extraction
  const handleFileUpload = async () => {
    if (!selectedFile || !datasetType) {
      alert('Please select a dataset type and upload a ZIP file.')
      return
    }

    const zip = new JSZip()
    const extractedImages = []

    try {
      const content = await zip.loadAsync(selectedFile)
      for (const fileName in content.files) {
        const file = content.files[fileName]
        if (!file.dir && /\.(png|jpe?g|gif)$/i.test(file.name)) {
          const imageBlob = await file.async('blob')
          const imageUrl = URL.createObjectURL(imageBlob)
          extractedImages.push({ name: file.name, url: imageUrl })
        }
      }

      if (extractedImages.length > 0) {
        setImageFiles(extractedImages)
        alert(`Images extracted successfully for ${datasetType} dataset!`)
      } else {
        alert('No images found in the zip file.')
      }
    } catch (error) {
      console.error('Error extracting files:', error)
      alert('Failed to extract the zip file.')
    }
  }

  // Handle sharing with radiologist
  const handleShareWithRadiologist = () => {
    if (!selectedRadiologist || imageFiles.length === 0) {
      alert('Please select a radiologist and ensure images are uploaded.')
      return
    }

    // Debugging logs
    console.log('Selected radiologistId:', selectedRadiologist)
    console.log('Dataset Type:', datasetType)
    console.log('Images to be shared:', imageFiles)

    // Dispatch the action to share images with the selected radiologist
    dispatch(
      shareImagesWithRadiologist({
        radiologistId: Number(selectedRadiologist), // Make sure it's a number
        datasetType,
        images: imageFiles, // Images being shared
      })
    )

    // Log the updated Redux state to check if images are shared
    const radiologist = radiologists.find(
      (r) => r.id === Number(selectedRadiologist)
    )
    console.log('Updated radiologist data:', radiologist)

    alert(`Images shared with radiologist successfully!`)
  }

  return (
    <div className='p-8 bg-black min-h-screen'>
      <h2 className='text-2xl font-bold mb-6 text-white'>
        Unprocessed Datasets
      </h2>

      {/* Dataset Type Selection */}
      <div className='mb-6'>
        <label className='text-white block mb-2'>Select Dataset Type:</label>
        <select
          value={datasetType}
          onChange={handleDatasetTypeChange}
          className='text-white bg-gray-700 border border-gray-600 p-2 rounded-lg w-full'
        >
          <option value=''>Select</option>
          <option value='Chest'>Chest</option>
          <option value='Kidney'>Kidney</option>
        </select>
      </div>

      {/* File Upload Section */}
      <div className='mb-6'>
        <input
          type='file'
          accept='.zip'
          onChange={handleFileChange}
          className='text-white bg-gray-700 p-2 rounded-lg w-full'
        />
        <button
          onClick={handleFileUpload}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4'
        >
          Upload ZIP
        </button>
      </div>

      {/* Display Extracted Images */}
      {imageFiles.length > 0 && (
        <div>
          <h3 className='text-xl font-bold mb-4 text-white'>
            Extracted Images for {datasetType}:
          </h3>
          <div className='grid grid-cols-2 gap-4'>
            {imageFiles.map((image, index) => (
              <div key={index} className='bg-gray-800 p-4 rounded-lg'>
                <p className='text-white mb-2'>{image.name}</p>
                <img
                  src={image.url}
                  alt={image.name}
                  className='w-full h-32 object-cover rounded-lg'
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share With Radiologist Section */}
      {imageFiles.length > 0 && (
        <div className='mt-8'>
          <h3 className='text-xl font-bold mb-4 text-white'>
            Share with Radiologist:
          </h3>
          <select
            onChange={(e) => setSelectedRadiologist(e.target.value)}
            className='text-white bg-gray-700 border border-gray-600 p-2 rounded-lg w-full'
          >
            <option value=''>Select Radiologist</option>
            {radiologists.map((radiologist) => (
              <option key={radiologist.id} value={radiologist.id}>
                {radiologist.radiologistName}
              </option>
            ))}
          </select>

          {/* Share Button */}
          <button
            onClick={handleShareWithRadiologist}
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4'
          >
            Share
          </button>
        </div>
      )}
    </div>
  )
}

export default UnprocessedDatasets
