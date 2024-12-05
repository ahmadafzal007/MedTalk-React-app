import { useState } from 'react';
// import './chat.css';

const RadiologistRegistrationForm = ({ setShowForm }) => {
  const [name, setName] = useState(''); // State for name
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [phone, setPhone] = useState(''); // State for phone number
  const [loading, setLoading] = useState(false); // State for handling loading
  const [error, setError] = useState(''); // State for handling errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRadiologist = { name, email, password, phone };

    try {
      setLoading(true); // Start loading

      // API call to register a new radiologist (placeholder for actual API call)
      // await RadiologistController.register(newRadiologist);

      // Reset the form after successful submission
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');

      setShowForm(false); // Close the form
    } catch (error) {
      setError('Failed to register radiologist. Please try again.'); // Handle error
      console.error('Error registering radiologist:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-full  font-poppins mx-auto p-8  text-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        R<span className="font-normal">adiologist</span> R<span className="font-normal">egistration</span>
      </h2>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display error message */}
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-xs font-normal text-white">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-4 border text-xs border-gray-700 bg-[#151518] text-gray-200 rounded-lg transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter radiologist's full name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-xs font-normal text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-4 border text-xs border-gray-700 bg-[#151518] text-gray-200 rounded-lg transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-xs font-normal text-white">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full p-4 border text-xs border-gray-700 bg-[#151518] text-gray-200 rounded-lg transition"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              required
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-xs font-normal text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-4 border text-xs border-gray-700 bg-[#151518] text-gray-200 rounded-lg transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>


          {/* Note Card */}
          <div className="bg-[#151518] border border-gray-700 p-4 rounded-lg text-xs">
            <h3 className="font-semibold text-white">Note:</h3>
            <p className="text-gray-300">
              Please ensure the information provided is accurate. This data will be used for registration purposes
              and must not be shared with unauthorized entities.
            </p>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="submit"
              className="bg-[#151518] text-xs border border-gray-700 hover:border-white text-white py-2 px-4 mr-40 rounded-lg shadow-md transition ease-in-out"
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
         
          </div>
        </form>
      </div>
    </div>
  );
};

export default RadiologistRegistrationForm;
