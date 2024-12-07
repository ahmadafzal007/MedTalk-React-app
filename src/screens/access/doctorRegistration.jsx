// DoctorRegistrationForm.jsx
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { AiOutlineCamera, AiOutlineClose, AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import IndexController from "../../API/index";
import HospitalControllers from "../../API/hospital";
import axios from "axios";
import Loader from "./Loader"; // Import the Loader component

export default function DoctorRegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    medicalLicenseNumber: "",
    cnic: "",
    department: "",
    hospitalId: "",
    hospitalName: "",
    profilePicture: null,
    profilePictureFile: null,
  });

  const [hospitals, setHospitals] = useState([]);
  const [pendingAuthorization, setPendingAuthorization] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch authorized hospitals on component mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitalData = await HospitalControllers.viewAuthorizedHospitals();
        setHospitals(hospitalData.authorizedHospitals);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle hospital selection
  const handleHospitalChange = (e) => {
    const selectedHospitalId = e.target.value;
    const selectedHospital = hospitals.find(hospital => hospital._id === selectedHospitalId);

    setFormData(prevData => ({
      ...prevData,
      hospitalId: selectedHospitalId,
      hospitalName: selectedHospital ? selectedHospital.user.name : ""
    }));
  };

  // Handle phone number input
  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  // Handle profile picture upload
  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: URL.createObjectURL(file),
        profilePictureFile: file,
      }));
    }
  };

  // Remove profile picture
  const handleRemovePicture = () => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: null,
      profilePictureFile: null,
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

      // Prepare doctor data for registration
      const doctorData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        medicalLicenseNumber: formData.medicalLicenseNumber,
        cnic: formData.cnic,
        department: formData.department,
        profileImage: profileImageUrl,
        hospitalName: formData.hospitalName,
      };

      console.log("Doctor Data:", doctorData);

      // Call the API to register the doctor
      const response = await IndexController.registerDoctor(doctorData);

      if (response) {
        console.log("Doctor registration successful");
        localStorage.setItem("accessToken", response.accessToken);

        // Dispatch login action to save user state in Redux store
        dispatch(
          login({
            _id: response.doctor.user,
            name: formData.name,
            email: formData.email,
            auth: true,
            role: 'doctor',
            profileImage: formData.profilePicture || response.doctor.profileImage,
          })
        );

        if (response.doctor.authorizationStatus) {
          // If authorized, redirect to the main page
          navigate("/main");
        } else {
          // If not authorized, show pending authorization message
          setPendingAuthorization(true);
        }
      } else {
        // Handle the case where response is falsy
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Doctor registration failed", error);
      alert(`Registration failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Conditional Rendering based on pendingAuthorization
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
        <div className="w-full max-w-xl bg-[#151518] py-10 px-16  border border-gray-700  text-center">
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
          onClick={() => navigate("/")}
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
            By registering for MedTalk Pro, you will gain access to a suite of premium features tailored to support your medical practice. These include advanced tools for ECG analysis, X-ray analysis, and CT scan interpretation. MedTalk Pro also offers streamlined management of patient data, enabling you to keep records organized and efficiently generate automated reports. Additionally, you can engage in AI-driven conversations with Large Language Models (LLMs) to enhance your clinical decision-making. Join MedTalk Pro today to elevate your practice with cutting-edge technology.
          </div>
        </h2>
      </div>

      {/* Registration form */}
      <div className="w-full bg-[#151518] p-5 border rounded border-gray-700 max-w-7xl relative">
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
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
                placeholder="Dr. Tariq"
              />
              <p className="text-xs text-gray-500 mt-1">Full Name</p>
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
                dropdownClass="phone-dropdown"
                dropdownOptions={{
                  customStyles: {
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? '#4B5563' : '#151518',
                      color: 'white',
                    }),
                  },
                }}
              />
              <p className="text-xs text-gray-500 mt-1">Please enter a valid phone number</p>
            </div>
            {/* Medical License Number Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Medical License Number</label>
              <input
                type="text"
                name="medicalLicenseNumber"
                value={formData.medicalLicenseNumber}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
                placeholder="xxxxxxxxxxxxx"
              />
              <p className="text-xs text-gray-500 mt-1">Enter your Medical License Number</p>
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
              <p className="text-xs text-gray-500 mt-1">Enter your CNIC number</p>
            </div>
          </div>

          {/* Department and Gender Fields */}
          <div className="grid grid-cols-2 gap-6 mt-6">
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
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
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
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>

            {/* Hospital Field with Dropdown */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Hospital</label>
              <select
                name="hospitalId"
                value={formData.hospitalId}
                onChange={handleHospitalChange}
                className="w-full bg-[#151518] border-b-2 border-gray-700 hover:border-white px-3 py-2 text-sm focus:outline-none"
                required
              >
                <option value="" disabled>Select Hospital</option>
                {hospitals && hospitals.length > 0 ? (
                  hospitals.map((hospital) => (
                    <option key={hospital._id} value={hospital._id}>
                      {hospital.user.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading hospitals...</option>
                )}
              </select>
            </div>
          </div>

          {/* Register Button */}
          <div className="mt-8 flex justify-center">
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
