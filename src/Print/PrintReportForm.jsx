import React, { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ReportDocument from './ReportDocument'
import { Printer } from 'lucide-react'
import Select from 'react-select'
import CountryFlag from 'react-country-flag'
import './PrintReportForm.css'

// Country data (for the dropdown with flags)
import countryList from 'react-select-country-list'

const PrintReportForm = () => {
  const [formData, setFormData] = useState({
    docName: '',
    patientName: '',
    patientCnic: '',
    patientGender: '',
    age: 0,
    nationality: '',
    diseaseDetected: '',
    medicineRecommendations: '',
    specialInstructions: '',
    hospitalName: '',
  })

  const [age, setAge] = useState(0)
  const countries = countryList().getData()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleGenderChange = (selectedOption) => {
    setFormData({ ...formData, patientGender: selectedOption.value })
  }

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, nationality: selectedOption.value })
  }

// Custom styles for react-select dropdowns
const customSelectStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#151518',
    color: 'white',
    borderColor: isFocused ? '#FFFFFF' : '#4B5563', // white on hover/focus, gray-600 by default
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#FFFFFF', // Change border color on hover
    },
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused ? '#24242a' : '#151518', // Darker on focus
    color: isSelected ? 'white' : 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#24242a', // Darker background on hover
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: 'white',
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#151518',
    border: '1px solid #4B5563', // gray-600 border for dropdown
  }),
  placeholder: (styles) => ({
    ...styles,
    color: 'white',
  }),
}


  return (
    <div className='p-6 font-poppins bg-[#151518] text-white min-h-screen overflow-auto'>
      <h2 className='text-2xl font-bold text-center mb-8'>
        Patient Report Form
      </h2>

      <form className='grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-700 rounded-lg p-4 bg-[#151518] font-poppins text-xs'>
        <div className='form-group'>
          <label className='block text-white'>Doctor Name</label>
          <input
            type='text'
            name='docName'
            value={formData.docName}
            onChange={handleChange}
            placeholder='Enter Doctor Name'
            className='w-full p-2 rounded border border-gray-600 bg-[#151518] text-white'
          />
        </div>

        <div className='form-group'>
          <label className='block text-white'>Patient Name</label>
          <input
            type='text'
            name='patientName'
            value={formData.patientName}
            onChange={handleChange}
            placeholder='Enter Patient Name'
            className='w-full p-2 rounded border border-gray-600 bg-gray-800 text-white'
          />
        </div>

        <div className='form-group'>
          <label className='block text-white'>CNIC</label>
          <input
            type='text'
            name='patientCnic'
            value={formData.patientCnic}
            onChange={handleChange}
            placeholder='Enter CNIC'
            className='w-full p-2 rounded border border-gray-600 bg-gray-800 text-white'
          />
        </div>

        {/* Gender Dropdown */}
        <div className='form-group'>
          <label className='block text-white'>Gender</label>
          <Select
            className='w-full text-black'
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
            onChange={handleGenderChange}
            placeholder='Select Gender'
            styles={customSelectStyles}
          />
        </div>

        {/* Age Counter */}
        <div className='form-group'>
          <label className='block text-white'>Age</label>
          <div className='flex items-center'>
            <input
              type='number'
              name='age'
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className='w-16 text-center bg-gray-800 text-white'
              min='0'
            />
          </div>
        </div>

        {/* Nationality Dropdown */}
        <div className='form-group'>
          <label className='block text-white'>Nationality</label>
          <Select
            className='w-full text-black '
            options={countries.map((country) => ({
              value: country.label,
              label: (
                <div className='flex items-center'>
                  <CountryFlag
                    countryCode={country.value}
                    svg
                    style={{ marginRight: '10px' }}
                  />
                  {country.label}
                </div>
              ),
            }))}
            onChange={handleCountryChange}
            placeholder='Select Country'
            styles={customSelectStyles}
          />
        </div>

        <div className='col-span-2 form-group'>
          <label className='block text-white'>Disease Detected</label>
          <input
            type='text'
            name='diseaseDetected'
            value={formData.diseaseDetected}
            onChange={handleChange}
            placeholder='Enter Disease Detected'
            className='w-full p-2 rounded border border-gray-600 bg-gray-800 text-white'
          />
        </div>

        <div className='col-span-2 form-group'>
          <label className='block text-white'>Medicine Recommendations</label>
          <input
            type='text'
            name='medicineRecommendations'
            value={formData.medicineRecommendations}
            onChange={handleChange}
            placeholder='Enter Medicine Recommendations (comma-separated)'
            className='w-full p-2 rounded border border-gray-600 bg-gray-800 text-white'
          />
        </div>

        <div className='col-span-2 form-group'>
          <label className='block text-white'>Special Instructions</label>
          <input
            type='text'
            name='specialInstructions'
            value={formData.specialInstructions}
            onChange={handleChange}
            placeholder='Enter Special Instructions'
            className='w-full p-2 rounded border border-gray-600 bg-gray-800 text-white'
          />
        </div>

        <div className='col-span-2 form-group'>
          <label className='block text-white'>Hospital Name</label>
          <input
            type='text'
            name='hospitalName'
            value={formData.hospitalName}
            onChange={handleChange}
            placeholder='Enter Hospital Name'
            className='w-full p-2 rounded border border-gray-600 bg-gray-800 text-white'
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
              age={age}
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
              <button className='bg-[#151518] border border-gray-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-[#24242a] transition duration-300 shadow-lg font-poppins text-xs'>
                <Printer className='mr-2 text-white' size={14} />
                Generate Report
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  )
}

export default PrintReportForm
