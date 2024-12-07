// HospitalRegistrationForm.jsx
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import Select from "react-select";
import countryList from "react-select-country-list";
import { AiOutlineCamera, AiOutlineClose, AiOutlineArrowLeft } from "react-icons/ai";
import WorldFlag from 'react-world-flags';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IndexController from "../../API/index"; // Import IndexController
import Loader from "./Loader"; // Import Loader for showing loading spinner

export default function HospitalRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    licenseNumber: "",
    hospitalType: "",
    hospitalAddress: "",
    profilePicture: null,
    profilePictureFile: null, // for actual file upload
    country: "",
  });

  const [loading, setLoading] = useState(false); // for loading state
  const [pendingAuthorization, setPendingAuthorization] = useState(false); // for authorization pending

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
        profilePictureFile: file, // actual file for upload
      }));
    }
  };

  const handleRemovePicture = () => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: null,
      profilePictureFile: null,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      country: selectedOption ? selectedOption.value : "",
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      let profileImageUrl = null;

      // Upload profile picture to Cloudinary if present
      if (formData.profilePictureFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", formData.profilePictureFile);
        imageFormData.append("upload_preset", "kmzzjyam"); // Replace with your upload preset
        imageFormData.append("cloud_name", "dj3p3xvrj"); // Replace with your cloud name

        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dj3p3xvrj/image/upload",
          imageFormData
        );

        profileImageUrl = cloudinaryResponse.data.secure_url;
      }

      // Combine firstName and lastName into a single 'name' field
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      // Prepare hospital data for registration
      const hospitalData = {
        name: fullName, // Combined name
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        registrationLicenseNumber: formData.licenseNumber, // Changed field name
        hospitalType: formData.hospitalType,
        address: formData.hospitalAddress, // Changed field name
        profileImage: profileImageUrl,
        country: formData.country,
      };

      console.log("Hospital Data:", hospitalData);

      // Call the API to register the hospital
      const response = await IndexController.registerHospital(hospitalData);

      if (response) {
        console.log("Hospital registration successful");
        // Set pending authorization message
        setPendingAuthorization(true);
      } else {
        // Handle the case where response is falsy
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Hospital registration failed", error);
      alert(`Registration failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // If pending authorization, show the pending card
  if (pendingAuthorization) {
    return (
      <div className="min-h-screen pt-10 bg-black text-white flex flex-col items-center justify-center p-4 relative">
        {/* Back Icon */}
        <div className="absolute top-5 left-5">
          <AiOutlineArrowLeft
            className="text-2xl text-white cursor-pointer"
            onClick={() => navigate("/")} // Navigate to the home page
          />
        </div>
        {/* Pending Authorization Card */}
        <div className="w-full max-w-xl bg-[#151518] py-10 px-16  border border-gray-700 text-center">
          <h3 className="text-2xl font-semibold mb-4">Access Pending</h3>
          <p className="text-sm text-gray-300">
            Your registration is successful but your access is pending. Your respective hospital will review your profile, and once approved, you will be able to access your account. Stay tuned.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 bg-black text-white flex flex-col items-center justify-center p-4 relative">
      {/* Back Icon */}
      <div className="absolute top-5 left-5">
        <AiOutlineArrowLeft
          className="text-2xl text-white cursor-pointer"
          onClick={() => navigate("/")} // Navigate to the home page
        />
      </div>

      {/* Display Loader when loading */}
      {loading && <Loader />}

      {/* Logo and Note */}
      <div className="text-center mb-2">
        <h2 className="text-lg font-poppins font-normal mb-2">
          <img src='/medtalk-main.png' className="mx-auto h-28 w-36 mb-4" alt="MedTalk Logo" />
          <div className="border px-4 py-2 max-w-7xl rounded-lg text-xs text-start">
            <span className="font-extrabold">Note:</span>
            <span> </span>
            By registering your hospital on MedTalk, you are taking the first step to authorize your institution for participation in our professional healthcare network. Once your hospital is successfully registered and verified, you will have the ability to grant access to your licensed doctors, enabling them to join MedTalk Pro. This platform is designed exclusively for healthcare professionals, offering a space for collaboration, medical discussions, and professional growth. Please ensure all provided information is accurate to facilitate a smooth verification process.
          </div>
        </h2>
      </div>

      {/* Registration form */}
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

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-6 mt-7">
            {/* First and Last Name */}
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
                    placeholder="First Name"
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
                    placeholder="Last Name"
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
                placeholder="example@gmail.com"
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
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <Select
                name="country"
                value={countriesWithFlags.find(
                  (option) => option.value === formData.country
                )}
                onChange={handleSelectChange}
                options={countriesWithFlags}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "#151518", // Background color of the dropdown
                    border: "0px solid #151518", // Border color gray-700
                    boxShadow: "none", // Remove shadow
                    "&:hover": {
                      borderColor: "#4B5563", // Border color on hover (gray-700)
                    },
                    minHeight: "30px", // Reduce the height to fit the text
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "white", // Text color
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: "white", // Placeholder text color
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: "#151518", // Background color of the dropdown options
                    color: "white", // Text color of the dropdown options
                    border: "1px solid #4B5563", // Border for the dropdown list
                    minWidth: "fit-content", // Decrease the width to fit the text
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? "#4B5563" : "#151518", // Change background color on hover (gray-700)
                    color: "white", // Text color for options
                    padding: "8px 12px", // Adjust padding for text
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    color: "white", // Dropdown indicator color
                    "&:hover": {
                      color: "gray", // Indicator color on hover
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
                  className: 'w-full bg-[#151518] border-b-2 border-gray-700 hover:border-white hover:bg-gray-700 px-12 py-2 text-sm focus:outline-none',
                }}
                dropdownStyle={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: '#4B5563',
                }}
                buttonStyle={{
                  backgroundColor: '#151518',
                  borderColor: '#4B5563',
                }}
                buttonClassName="bg-[#151518] border border-[#4B5563] hover:bg-[#4B5563] transition duration-300"
                containerStyle={{
                  borderColor: '#4B5563',
                }}
                inputStyle={{
                  color: 'white',
                  backgroundColor: '#151518',
                }}
                isValid={(value, country) => {
                  return value.length <= country.format.length;
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

            {/* Hospital Type Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Hospital Type</label>
              <select
                name="hospitalType"
                value={formData.hospitalType}
                onChange={handleInputChange}
                className="w-full bg-[#151518] border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
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
                name="hospitalAddress"
                value={formData.hospitalAddress}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
                placeholder="Hospital Address"
              />
              <p className="text-xs text-gray-500 mt-1">Enter your hospital's address</p>
            </div>
          </div>

          {/* Register Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg bg-[#151518] border border-gray-700 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:border-white"
              } text-white text-sm flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
