import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { AiOutlineCamera, AiOutlineClose, AiOutlineArrowLeft } from "react-icons/ai"; // Added Arrow Icon
import { useNavigate } from "react-router-dom"; // For navigation

export default function DoctorRegistrationForm() {
  const navigate = useNavigate(); // Use navigation for redirecting to the home page

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
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      country: selectedOption ? selectedOption.value : "",
    }));
  };

  return (
    <div className="min-h-screen  pt-10 bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="absolute top-5 left-5">
          <AiOutlineArrowLeft
            className="text-2xl text-white cursor-pointer"
            onClick={() => navigate("/")} // Navigate to the home page
          />
        </div>
          <div className="text-center mb-2">
            <h2 className="text-lg font-poppins font-normal mb-2">
            <img src='/medtalk-main.png'  className="mx-auto h-28 w-36 mb-4" />
            <div className="border  px-4 py-2 max-w-7xl rounded-lg text-xs text-start"><span className="font-extrabold">Note:</span><span> </span>
            By registering for MedTalk Pro, you will gain access to a suite of premium features tailored to support your medical practice. These include advanced tools for ECG analysis, X-ray analysis, and CT scan interpretation. MedTalk Pro also offers streamlined management of patient data, enabling you to keep records organized and efficiently generate automated reports. Additionally, you can engage in AI-driven conversations with Large Language Models (LLMs) to enhance your clinical decision-making. Join MedTalk Pro today to elevate your practice with cutting-edge technology.             </div>            </h2>
          </div>
      <div className="w-full bg-[#151518] p-5 border rounded- border-gray-700 max-w-7xl relative">
        {/* Back Icon */}

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
              <p className="text-xs text-gray-500 mt-1">XXXXXXXXXXXXX</p>
            </div>
          </div>

          {/* Gender and Department Fields */}
          <div className="grid grid-cols-2 gap-6 mt-6">
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
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>

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
                <option value="orthopedics">Orthopedics</option>
              </select>
            </div>
            {/* Hospital Field with Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">Hospital</label>
              <select
                name="hospital"
                value={formData.hospital}
                onChange={handleInputChange}
                className="w-full bg-[#151518] border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
              >
                <option value="" disabled>Select Hospital</option>
                <option value="hospital_a">Hospital A</option>
                <option value="hospital_b">Hospital B</option>
                <option value="hospital_c">Hospital C</option>
                <option value="hospital_d">Hospital D</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
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
