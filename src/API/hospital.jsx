import axios from 'axios';

class HospitalControllers {
  constructor() {
    this.apiUrl = 'http://localhost:3000/api/hospital';
  }

  // Dynamically fetch token for each request
  setHeaders() {
    const token = localStorage.getItem('accessToken'); // Always get the latest token
    if (!token) {
      throw new Error('Authorization token not found');
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  }

  // View unauthorized doctors
  async viewUnauthorizedDoctors() {
    try {
      const response = await axios.get(`${this.apiUrl}/unauthorizedDoctors`, this.setHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching unauthorized doctors:', error);
      throw error;
    }
  }

  // View authorized doctors
  async viewAuthorizedDoctors() {
    try {
      const response = await axios.get(`${this.apiUrl}/authorizedDoctors`, this.setHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching authorized doctors:', error);
      throw error;
    }
  }

  // Authorize a doctor
  async authorizeDoctor(doctorId) {
    try {
      const response = await axios.patch(`${this.apiUrl}/authorizeDoctor`, { doctorId }, this.setHeaders());
      return response.data;
    } catch (error) {
      console.error('Error authorizing doctor:', error);
      throw error;
    }
  }

  // Unauthorize a doctor
  async unauthorizeDoctor(doctorId) {
    try {
      const response = await axios.patch(`${this.apiUrl}/unauthorizeDoctor`, { doctorId }, this.setHeaders());
      return response.data;
    } catch (error) {
      console.error('Error unauthorizing doctor:', error);
      throw error;
    }
  }

  // Delete an unauthorized doctor
  async deleteDoctor(doctorId) {
    try {
      const response = await axios.delete(`${this.apiUrl}/deleteDoctor`, {
        ...this.setHeaders(),
        data: { doctorId },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting doctor:', error);
      throw error;
    }
  }

  // View authorized hospitals
  async viewAuthorizedHospitals() {
    try {
      const response = await axios.get(`${this.apiUrl}/viewAuthorizedHospitals`, this.setHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching authorized hospitals:', error);
      throw error;
    }
  }

  // View hospital profile
  async viewHospitalProfile() {
    try {
      const response = await axios.get(`${this.apiUrl}/profile`, this.setHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching hospital profile:', error);
      throw error;
    }
  }
}

export default new HospitalControllers();
