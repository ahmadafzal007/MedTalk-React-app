import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
// import logo from '../assets/Logo.png';
import {  AiOutlineArrowLeft } from "react-icons/ai"; // Added Arrow Icon
import { useNavigate } from "react-router-dom"; // For navigation

export default function DoctorRegistrationForm() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    licenseNumber: "",
    cnic: "",
    gender: "",
    department: "",
    hospital: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen  pt-10 bg-black text-white flex flex-col items-center justify-center p-4">
    <div className="absolute top-5 left-5">
      <AiOutlineArrowLeft
        className="text-2xl text-white cursor-pointer"
        onClick={() => navigate("/main")} // Navigate to the home page
      />
    </div>
      <div className="text-center mb-2">
        <h2 className="text-lg font-poppins font-normal mb-2">
        <img src='/medtalk-main.png'  className="mx-auto h-28 w-36 mb-4" />
        <div className="border  px-4 py-2 max-w-7xl rounded-lg text-xs text-start"><span className="font-extrabold">Note:</span><span> </span>
        By Upgrading to MedTalk Pro, you will gain access to a suite of premium features tailored to support your medical practice. These include advanced tools for ECG analysis, X-ray analysis, and CT scan interpretation. MedTalk Pro also offers streamlined management of patient data, enabling you to keep records organized and efficiently generate automated reports. Additionally, you can engage in AI-driven conversations with Large Language Models (LLMs) to enhance your clinical decision-making. Join MedTalk Pro today to elevate your practice with cutting-edge technology.             </div>            </h2>
      </div>
  <div className="w-full bg-[#151518] p-5 border rounded- border-gray-700 max-w-7xl relative">
    {/* Back Icon */}

        <form onSubmit={handleSubmit} className="relative z-10">

          <div className="grid grid-cols-2 gap-6 mt-7">
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
            {/* CNIC Field */}
            <div>
              <label className="block text-sm font-medium mb-1">CNIC</label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
                placeholder="XXXXX-XXXXXXX-X"
              />
              <p className="text-xs text-gray-500 mt-1">XXXXX-XXXXXXX-X</p>
            </div>
            {/* Gender Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full bg-[#151518] border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Department Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full bg-[#151518] border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
              >
                <option value="" disabled>Select Department</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="pediatrics">Pediatrics</option>
                {/* Add more departments as needed */}
              </select>
            </div>
            {/* Hospital Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Hospital Associated</label>
              <select
                name="hospital"
                value={formData.hospital}
                onChange={handleInputChange}
                className="w-full bg-[#151518] border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
              >
                <option value="">Select Hospital</option>
                <option value="hospital1">Hospital 1</option>
                <option value="hospital2">Hospital 2</option>
                <option value="hospital3">Hospital 3</option>
                {/* Add more hospitals as needed */}
              </select>
            </div>
          </div>

         {/* Submit Button */}
         <div className="flex justify-center mt-10">
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
