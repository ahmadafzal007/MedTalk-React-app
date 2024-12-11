import axios from 'axios';

class AdminControllers {
  constructor() {
    this.apiUrl = 'http://localhost:3000/api/admin';
  }

  // Function to get the access token from local storage
  getAccessToken() {
    return localStorage.getItem('accessToken'); // Change 'accessToken' if your key is different
  }

  // Common headers for all requests
  getHeaders() {
    const token = this.getAccessToken();
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  // View unauthorized hospitals
  async viewUnauthorizedHospitals() {
    console.log('inside api')
    try {
      const response = await axios.get(`${this.apiUrl}/unauthorizedHospitals`, {
        headers: this.getHeaders(),
      });
      console.log(response.data);
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error fetching unauthorized hospitals:', error);
      throw error; // Throw error to handle in your component
    }
  }

  // View authorized hospitals
  async viewAuthorizedHospitals() {
    try {
      const response = await axios.get(`${this.apiUrl}/authorizedHospitals`, {
        headers: this.getHeaders(),
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error fetching authorized hospitals:', error);
      throw error; // Throw error to handle in your component
    }
  }

  // Authorize a hospital
  async authorizeHospital(hospitalId) {
    try {
      const response = await axios.patch(
        `${this.apiUrl}/authorizeTheHospital`,
        { hospitalId },
        { headers: this.getHeaders() }
      );
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error authorizing hospital:', error);
      throw error; // Throw error to handle in your component
    }
  }

  // Unauthorize a hospital
  async unauthorizeHospital(hospitalId) {
    try {
      const response = await axios.patch(
        `${this.apiUrl}/unauthorizeTheHospital`,
        { hospitalId },
        { headers: this.getHeaders() }
      );
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error unauthorized hospital:', error);
      throw error; // Throw error to handle in your component
    }
  }

  // Delete unauthorized hospital
  async deleteUnauthorizedHospital(hospitalId) {
    try {
      const response = await axios.delete(`${this.apiUrl}/deleteUnauthorizedHospital`, {
        headers: this.getHeaders(),
        data: { hospitalId }, // Sending hospitalId in the request body
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error deleting unauthorized hospital:', error);
      throw error; // Throw error to handle in your component
    }
  }
}

export default new AdminControllers();
