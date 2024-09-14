import React, { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ReportDocument from './ReportDocument'
import { Printer } from 'lucide-react'

const PrintReportForm = () => {
  const [formData, setFormData] = useState({
    docName: '',
    patientName: '',
    patientCnic: '',
    patientGender: '',
    age: '',
    nationality: '',
    diseaseDetected: '',
    medicineRecommendations: '',
    specialInstructions: '',
    hospitalName: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className='p-6 bg-gray-900 text-white min-h-screen'>
      {/* Form Heading */}
      <h2 className='text-3xl font-bold text-center mb-8'>
        Patient Report Form
      </h2>

      {/* Form for input */}
      <form className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label className='block text-white'>Doctor Name</label>
          <input
            type='text'
            name='docName'
            value={formData.docName}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-800 text-white'
          />
        </div>
        <div>
          <label className='block text-white'>Patient Name</label>
          <input
            type='text'
            name='patientName'
            value={formData.patientName}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-800 text-white'
          />
        </div>
        <div>
          <label className='block text-white'>CNIC</label>
          <input
            type='text'
            name='patientCnic'
            value={formData.patientCnic}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-800 text-white'
          />
        </div>
        <div>
          <label className='block text-white'>Gender</label>
          <input
            type='text'
            name='patientGender'
            value={formData.patientGender}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-800 text-white'
          />
        </div>
        <div>
          <label className='block text-white'>Age</label>
          <input
            type='text'
            name='age'
            value={formData.age}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-800 text-white'
          />
        </div>
        <div>
          <label className='block text-white'>Nationality</label>
          <input
            type='text'
            name='nationality'
            value={formData.nationality}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-800 text-white'
          />
        </div>
        <div className='col-span-2'>
          <label className='block text-white'>Disease Detected</label>
          <input
            type='text'
            name='diseaseDetected'
            value={formData.diseaseDetected}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-800 text-white'
          />
        </div>
        <div className='col-span-2'>
          <label className='block text-white'>Medicine Recommendations</label>
          <input
            type='text'
            name='medicineRecommendations'
            value={formData.medicineRecommendations}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-800 text-white'
          />
        </div>
        <div className='col-span-2'>
          <label className='block text-white'>Special Instructions</label>
          <input
            type='text'
            name='specialInstructions'
            value={formData.specialInstructions}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-800 text-white'
          />
        </div>
        <div className='col-span-2'>
          <label className='block text-white'>Hospital Name</label>
          <input
            type='text'
            name='hospitalName'
            value={formData.hospitalName}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-800 text-white'
          />
        </div>
      </form>

      {/* Generate PDF button */}
      <div className='mt-6'>
        <PDFDownloadLink
          document={
            <ReportDocument
              docName={formData.docName}
              patientName={formData.patientName}
              patientCnic={formData.patientCnic}
              patientGender={formData.patientGender}
              age={formData.age}
              nationality={formData.nationality}
              diseaseDetected={formData.diseaseDetected}
              medicineRecommendations={formData.medicineRecommendations.split(
                ','
              )}
              specialInstructions={formData.specialInstructions}
              hospitalName={formData.hospitalName}
            />
          }
          fileName='patient_summary_report.pdf'
        >
          {({ loading }) =>
            loading ? (
              'Loading...'
            ) : (
              <button className='bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-700 transition duration-300 shadow-lg'>
                <Printer className='mr-2 text-white' size={18} />
                Generate PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  )
}

export default PrintReportForm
