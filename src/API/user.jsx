// UserControllers.js

import axios from 'axios';

class UserControllers {
  constructor() {
    this.apiUrl = 'http://localhost:3000/api/users'; // Base URL for your API
    this.token = localStorage.getItem('accessToken'); // Assuming you store JWT in local storage
  }

  // Set headers for the requests
  getHeaders() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    };
  }

  // Method to view user profile
  async viewProfile() {
    try {
      const response = await axios.get(`${this.apiUrl}/profile`, this.getHeaders());
      return response.data; // Returns user profile data
    } catch (error) {
      throw new Error(error.response.data.message || 'Error viewing profile');
    }
  }

  // Method to update user profile
  async updateUserProfile(name, profileImage) {
    try {
      const response = await axios.put(
        `${this.apiUrl}/profile/update`,
        { name, profileImage },
        this.getHeaders()
      );
      return response.data; // Returns updated user data
    } catch (error) {
      throw new Error(error.response.data.message || 'Error updating profile');
    }
  }

  // Method to upgrade user to doctor
  async upgradeToDoctor(phoneNumber, gender, medicalLicenseNumber,  department, hospitalName,  cnic) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/profile/upgrade`,
        { phoneNumber, gender, medicalLicenseNumber,  department, hospitalName, cnic },
        this.getHeaders()
      );
      return response.data; // Returns success message and doctor data
    } catch (error) {
      throw new Error(error.response.data.message || 'Error upgrading to doctor');
    }
  }
}

export default new UserControllers();
