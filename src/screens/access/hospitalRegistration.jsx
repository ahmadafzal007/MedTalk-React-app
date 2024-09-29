import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import Select from "react-select";
import countryList from "react-select-country-list";
import { AiOutlineCamera, AiOutlineClose } from "react-icons/ai";
import WorldFlag from 'react-world-flags'; // Import your flag component
import {  AiOutlineArrowLeft } from "react-icons/ai"; // Added Arrow Icon
import { useNavigate } from "react-router-dom"; // For navigation

export default function DoctorRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    licenseNumber: "",
    cnic: "",
    gender: "",
    department: "",
    hospital: "",
    profilePicture: null,
    country: "",
  });
  

const navigate = useNavigate();
// Generate the full country list using react-select-country-list
const countryOptions = countryList().getData().map((country) => ({
  value: country.value,
  label: country.label,
}));

// Create country options with flags
const countriesWithFlags = countryOptions.map((country) => ({
  value: country.value,
  label: (
    <div className="flex items-center space-x-2">
      <WorldFlag
        code={country.value}
        style={{
          width: '1.5em',
          height: '1.5em',
        }}
      />
      <span>{country.label}</span>
    </div>
  ),
}));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: URL.createObjectURL(file),
      }));
    }
  };

  const handleRemovePicture = () => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: null,
    }));
  };
  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      country: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen pt-10 bg-black text-white flex flex-col items-center justify-center p-4">
       <div className="absolute top-5 left-5">
          <AiOutlineArrowLeft
            className="text-2xl text-white cursor-pointer"
            onClick={() => navigate("/")} // Navigate to the home page
          />
        </div>
          <div className="text-center mb-2">
          <h2 className="text-lg font-poppins font-normal mb-2">
            <img src='/medtalk-main.png'  className="mx-auto  h-28 w-36 mb-4" />
             <div className="border  px-4 py-2 max-w-7xl rounded-lg text-xs text-start"><span className="font-extrabold">Note:</span><span> </span>
             By registering your hospital on MedTalk, you are taking the first step to authorize your institution for participation in our professional healthcare network. Once your hospital is successfully registered and verified, you will have the ability to grant access to your licensed doctors, enabling them to join MedTalk Pro. This platform is designed exclusively for healthcare professionals, offering a space for collaboration, medical discussions, and professional growth. Please ensure all provided information is accurate to facilitate a smooth verification process.
             </div>
            </h2>
          </div>

      <div className="w-full p-5 border border-gray-700 bg-[#151518] max-w-7xl relative">
        <form onSubmit={handleSubmit} className="relative z-10">

          {/* Profile Picture Upload */}
          <div className="flex justify-center items-center mb-9">
          <div className="relative w-28 h-28 border-2 bg-black border-dashed border-gray-700 hover:border-white rounded-full flex items-center justify-center">
          {!formData.profilePicture ? (
                <label htmlFor="profile-upload" className="flex items-center justify-center h-full w-full cursor-pointer">
                  <AiOutlineCamera className="text-white text-3xl" />
                </label>
              ) : (
                <>
                  <img
                    src={formData.profilePicture}
                    alt="Profile"
                    className="absolute inset-0 object-cover w-full h-full rounded-full"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePicture}
                    className="absolute -top-4 -right-3 bg-gray-700 rounded-full p-1 text-white"
                  >
                    <AiOutlineClose />
                  </button>
                </>
              )}
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Other Form Fields */}
          <div className="grid grid-cols-2 gap-6 mt-7">
            {/* Full Name Fields */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">First Name</p>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Last Name</p>
                </div>
              </div>
            </div>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">example@gmail.com</p>
            </div>
            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
                minLength={8}
                placeholder="*********"
              />
              <p className="text-xs text-gray-500 mt-1">Password should be at least 8 characters long</p>
            </div>
            {/* Country Field */}
          <div className="mt-0">
            <label className="  bg-transpart block text-sm font-medium ">Country</label>
            <Select
  name="country"
  value={countriesWithFlags.find(option => option.value === formData.country)}
  onChange={handleSelectChange}
  options={countriesWithFlags}
  styles={{
    control: (provided) => ({
      ...provided,
      backgroundColor: '#151518', // Background color of the dropdown
      border: '0px solid #151518', // Border color gray-700
      boxShadow: 'none',          // Remove shadow
      '&:hover': {
        borderColor: '#4B5563',   // Border color on hover (gray-700)
      },
      minHeight: '30px',          // Reduce the height to fit the text
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',            // Text color
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',            // Placeholder text color
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#151518', // Background color of the dropdown options
      color: 'white',            // Text color of the dropdown options
      border: '1px solid #4B5563', // Border for the dropdown list
      minWidth: 'fit-content',   // Decrease the width to fit the text
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4B5563' : '#151518', // Change background color on hover (gray-700)
      color: 'white',            // Text color for options
      padding: '8px 12px',       // Adjust padding for text
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'white',            // Dropdown indicator color
      '&:hover': {
        color: 'gray',           // Indicator color on hover
      },
    }),
  }}
/>

<div className="w-full bg-white border-b " />


          </div>
            {/* Phone Number Field */}
            <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
              <PhoneInput
  country={'pk'}
  value={formData.phoneNumber}
  onChange={handlePhoneChange}
  inputProps={{
    name: 'phoneNumber',
    required: true,
    className: 'w-full bg-[#151518] border-b-2 border-gray-700 hover:border-white hover:bg-gray-700 px-12 py-2 text-sm focus:outline-none', // border becomes white on hover
  }}
  dropdownStyle={{
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#4B5563', // gray-700 border color
  }}
  buttonStyle={{
    backgroundColor: '#151518', // button background color
    borderColor: '#4B5563', // gray-700 border color
  }}
  buttonClassName="bg-[#151518] border border-[#4B5563] hover:bg-[#4B5563] transition duration-300"
  containerStyle={{
    borderColor: '#4B5563', // Border for the entire input
  }}
  inputStyle={{
    color: 'white', // Phone number text color
    backgroundColor: '#151518',
  }}
  isValid={(value, country) => {
    return value.length <= country.format.length;
  }}
  
  dropdownClass="phone-dropdown"
  dropdownOptions={{
    customStyles: {
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#4B5563' : '#151518', // gray-700 when hovered
        color: 'white',
      }),
    },
  }}
/>
              <p className="text-xs text-gray-500 mt-1">Please enter a valid phone number</p>
            </div>
            {/* License Number Field */}
            <div>
              <label className="block text-sm font-medium mb-1">License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
                placeholder="XXXXXXXX"
              />
              <p className="text-xs text-gray-500 mt-1">XXXXXXXX</p>
            </div>
            <div>
             <label className="block text-sm font-medium mb-1">Hospital Type</label>
          <select
              name="hospitalType" // Changed name to follow camelCase convention
                value={formData.hospitalType} // Adjusted value to match the correct formData property
                   onChange={handleInputChange}
              className="w-full bg-[#151518]  border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
              required
                  >
                    <option value="" disabled>Select Hospital</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="non-profit">Non-Profit</option>
                  </select>
                </div>

            {/* Hospital Address Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Hospital Address</label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
                placeholder="XXXXXXXXXXXXX"
              />
              <p className="text-xs text-gray-500 mt-1">XXXXXXXXXXXXX</p>
            </div>
          </div>

          
                 {/* Submit Button */}
          <div className="mt-8 text-center">
          <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-[#151518]  border border-gray-700 hover:border-white text-white text-sm "
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


