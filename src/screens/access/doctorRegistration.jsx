
// import React, { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import 'react-phone-input-2/lib/style.css';
// import logo from '../assets/Logo.png';

// export default function DoctorRegistrationForm() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     licenseNumber: "",
//     cnic: "",
//     gender: "",
//     department: "",
//     hospital: "",
//     profilePicture: null, // Add profile picture state
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handlePhoneChange = (value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       phoneNumber: value,
//     }));
//   };

//   const handleProfileUpload = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       profilePicture: e.target.files[0], // Store the selected file
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     // Here you would typically send the data to your backend
//   };

//   return (
//     <div className="min-h-screen pt-10 bg-black text-white flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl relative">
//         <form onSubmit={handleSubmit} className="relative z-10">
//           <div className="text-center mb-8">
           
//             <h2 className="text-2xl font-semibold mb-2">
//             <img src={logo} alt="Logo" className="mx-auto h-16 w-16 mb-4" />
//               Doctor Registration Form
//             </h2>
//           </div>

//           <div className="grid grid-cols-2 gap-6 mt-7">
//             {/* Full Name Fields */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Full Name
//               </label>
//               <div className="flex space-x-2">
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="w-full bg-transparent border-b border-white px-3 py-2 text-sm focus:outline-none"
//                     required
//                   />
//                   <p className="text-xs text-gray-500 mt-1">First Name</p>
//                 </div>
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="w-full bg-transparent border-b border-white px-3 py-2 text-sm focus:outline-none"
//                     required
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Last Name</p>
//                 </div>
//               </div>
//             </div>
//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full bg-transparent border-b border-white px-3 py-2 text-sm focus:outline-none"
//                 required
//               />
//               <p className="text-xs text-gray-500 mt-1">example@gmail.com</p>
//             </div>
//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full bg-transparent border-b border-white px-3 py-2 text-sm focus:outline-none"
//                 required
//                 minLength={8}
//                 placeholder="*********"
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Password should be at least 8 characters long
//               </p>
//             </div>
//             {/* Phone Number Field */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Phone Number
//               </label>
//               <PhoneInput
//                 country={'pk'} // Set default country
//                 value={formData.phoneNumber}
//                 onChange={handlePhoneChange}
//                 inputProps={{
//                   name: 'phoneNumber',
//                   required: true,
//                   className: 'w-full bg-black border-b border-white px-12 py-2 text-sm focus:outline-none'
//                 }}
//                 dropdownStyle={{
//                   backgroundColor: 'white',
//                   color: 'black',
//                 }}
//                 buttonStyle={{
//                   backgroundColor: 'black',
//                 }}
//                 isValid={(value, country) => {
//                   return value.length <= country.format.length;
//                 }}
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Please enter a valid phone number
//               </p>
//             </div>
//             {/* License Number Field */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 License Number
//               </label>
//               <input
//                 type="text"
//                 name="licenseNumber"
//                 value={formData.licenseNumber}
//                 onChange={handleInputChange}
//                 className="w-full bg-transparent border-b border-white px-3 py-2 text-sm focus:outline-none"
//                 required
//                 placeholder="XX-XXXXX-X"
//               />
//               <p className="text-xs text-gray-500 mt-1">XX-XXXXX-X</p>
//             </div>
//             {/* CNIC Field */}
//             <div>
//               <label className="block text-sm font-medium mb-1">CNIC</label>
//               <input
//                 type="text"
//                 name="cnic"
//                 value={formData.cnic}
//                 onChange={handleInputChange}
//                 className="w-full bg-transparent border-b border-white px-3 py-2 text-sm focus:outline-none"
//                 required
//                 placeholder="XXXXX-XXXXXXX-X"
//               />
//               <p className="text-xs text-gray-500 mt-1">XXXXX-XXXXXXX-X</p>
//             </div>
//           </div>

//           {/* Gender and Department Fields */}
//           <div className="grid grid-cols-2 gap-6 mt-6">
//             <div>
//               <label className="block text-sm font-medium mb-1">Gender</label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleInputChange}
//                 className="w-full bg-black border-b border-white px-3 py-2 text-sm focus:outline-none"
//                 required
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Department
//               </label>
//               <select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleInputChange}
//                 className="w-full bg-black border-b border-white px-3 py-2 text-sm focus:outline-none"
//                 required
//               >
//                 <option value="">Select Department</option>
//                 <option value="cardiology">Cardiology</option>
//                 <option value="neurology">Neurology</option>
//                 <option value="pediatrics">Pediatrics</option>
//               </select>
//             </div>
//           </div>

//           {/* Hospital Field */}
//           <div className="grid grid-cols-2 gap-6 mt-6">
//             <div className="col-span-1">
//               <label className="block text-sm font-medium mb-1">
//                 Hospital Associated
//               </label>
//               <select
//                 name="hospital"
//                 value={formData.hospital}
//                 onChange={handleInputChange}
//                 className="w-full bg-black border-b border-white px-3 py-2 text-sm focus:outline-none"
//                 required
//               >
//                 <option value="">Select Hospital</option>
//                 <option value="hospital1">Hospital 1</option>
//                 <option value="hospital2">Hospital 2</option>
//                 <option value="hospital3">Hospital 3</option>
//               </select>
//             </div>
//             {/* Profile Upload Field */}
//             <div className="col-span-1">
//               <label className="block text-sm font-medium mb-1">Upload Profile</label>
//               <input
//                 type="file"
//                 name="profilePicture"
//                 onChange={handleProfileUpload}
//                 className="w-full bg-black text-white py-2 px-3 border-b border-white text-sm focus:outline-none"
//                 required
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center mt-8">
//             <button
//               type="submit"
//               className="text-center flex justify-center items-center bg-white text-black py-2 px-10 font-semibold rounded-full hover:bg-gray-200 transition duration-300"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




