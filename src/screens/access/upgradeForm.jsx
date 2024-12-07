// UpgradeToDoctorForm.jsx
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice"; // Adjust the import path as needed
import UserControllers from "../../API/user"; // Import UserControllers
import HospitalControllers from "../../API/hospital"; // Import HospitalControllers
import Loader from "./Loader"; // Import the Loader component

export default function UpgradeToDoctorForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    licenseNumber: "",
    cnic: "",
    gender: "",
    department: "",
    hospital: "",
  });

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for the submit button
  const [pendingAuthorization, setPendingAuthorization] = useState(false); // State for pending authorization

  // Fetch authorized hospitals on component mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitalData = await HospitalControllers.viewAuthorizedHospitals();
        setHospitals(hospitalData.authorizedHospitals); // Adjust according to your API response structure
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        alert("Failed to fetch hospitals. Please try again later.");
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

  // Handle phone number input
  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Destructure formData
      const { phoneNumber, licenseNumber, cnic, gender, department, hospital } = formData;

      // Prepare data for API
      const doctorData = {
        phoneNumber,
        gender,
        medicalLicenseNumber: licenseNumber, // Aligning with API parameter
        department,
        hospitalName: hospital, // Aligning with API parameter
        cnic,
      };

      console.log("Upgrade to Doctor Data:", doctorData);

      // Call the API to upgrade to doctor
      const response = await UserControllers.upgradeToDoctor(
        doctorData.phoneNumber,
        doctorData.gender,
        doctorData.medicalLicenseNumber,
        doctorData.department,
        doctorData.hospitalName,
        doctorData.cnic
      );

      if (response) {
        console.log("Upgrade to doctor successful");
        // Note: The response does not include accessToken, name, email, or profileImage

        // Dispatch login action to save user state in Redux store
        dispatch(
          login({
            _id: response.doctor.user, // User ID
            // Since the response does not include name and email, set them as empty strings or fetch them if needed
            name: "", // Placeholder, adjust as needed
            email: "", // Placeholder, adjust as needed
            auth: true,
            role: 'doctor',
            profileImage: "", // Placeholder, adjust as needed
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
        alert("Upgrade failed. Please try again.");
      }
    } catch (error) {
      console.error("Upgrade to doctor failed", error);
      // Extract error message if available
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Upgrade failed: ${errorMessage}`);
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
        <div className="w-full max-w-xl bg-[#151518] py-10 px-16  border border-gray-700 rounded-lg text-center">
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
          onClick={() => navigate("/main")} // Navigate to the main page
        />
      </div>

      {/* Display Loader when loading */}
      {loading && <Loader />}

      {/* Logo and Note */}
      <div className="text-center mb-2">
        <h2 className="text-lg font-poppins font-normal mb-2">
          {/* <img src='/medtalk-main.png' className="mx-auto h-28 w-36 mb-4" alt="MedTalk Logo" /> */}
          <div className="border px-4 py-2 max-w-7xl  text-xs text-start">
            <span className="font-extrabold">Note:</span>
            <span> </span>
            By upgrading to MedTalk Pro, you will gain access to a suite of premium features tailored to support your medical practice. These include advanced tools for ECG analysis, X-ray analysis, and CT scan interpretation. MedTalk Pro also offers streamlined management of patient data, enabling you to keep records organized and efficiently generate automated reports. Additionally, you can engage in AI-driven conversations with Large Language Models (LLMs) to enhance your clinical decision-making. Join MedTalk Pro today to elevate your practice with cutting-edge technology.
          </div>
        </h2>
      </div>

      {/* Upgrade to Doctor Form */}
      <div className="w-full bg-[#151518] p-5 border rounded border-gray-700 max-w-7xl relative">
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
                <option value="male">Male</option> {/* Changed to lowercase */}
                <option value="female">Female</option> {/* Changed to lowercase */}
                <option value="other">Other</option> {/* Changed to lowercase */}
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
                <option value="" disabled>Select Hospital</option>
                {hospitals && hospitals.length > 0 ? (
                  hospitals.map((hospital) => (
                    <option key={hospital._id} value={hospital.user.name}>
                      {hospital.user.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading hospitals...</option>
                )}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
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
                  Upgrading...
                </>
              ) : (
                "Upgrade"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
