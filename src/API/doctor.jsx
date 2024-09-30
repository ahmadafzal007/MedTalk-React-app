import axios from 'axios';

class DoctorsControllers {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api/doctor';
        this.headers = {
            'Content-Type': 'application/json',
            // Add your authentication token here, if needed
            // 'Authorization': `Bearer ${token}`
        };
    }

    // Method to create a new patient
    async createPatient(patientData) {
        try {
            const response = await axios.post(`${this.apiUrl}/createPatient`, patientData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                  }
             });
            return response.data;
        } catch (error) {
            console.error('Error creating patient:', error.response.data);
            throw error.response.data;
        }
    }

    // Method to view patient details
    async viewPatient(patientId) {
        try {
            const response = await axios.get(`${this.apiUrl}/patientDetails`, {
                headers: this.headers,
                params: { id: patientId }
            });
            return response.data;
        } catch (error) {
            console.error('Error viewing patient:', error.response.data);
            throw error.response.data;
        }
    }

    // Method to get all patients for the authenticated doctor
    async getAllPatients() {
        try {
            const response = await axios.get(`${this.apiUrl}/allpatients`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                  }
             });
            return response.data;
        } catch (error) {
            console.error('Error fetching all patients:', error.response.data);
            throw error.response.data;
        }
    }

    // Method to view patient chat history
    async viewPatientChat(patientId) {
        try {
            const response = await axios.get(`${this.apiUrl}/patientsChat`, {
                headers: this.headers,
                params: { id: patientId }
            });
            return response.data;
        } catch (error) {
            console.error('Error viewing patient chat:', error.response.data);
            throw error.response.data;
        }
    }

    // Method to view doctor profile
    async viewDoctorProfile() {
        try {
            const response = await axios.get(`${this.apiUrl}/profile`, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('Error viewing doctor profile:', error.response.data);
            throw error.response.data;
        }
    }

    // Method to search for a patient by CNIC
    async searchPatientByCNIC(cnic) {
        try {
            const response = await axios.post(`${this.apiUrl}/searchPatient`, { cnic }, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('Error searching for patient:', error.response.data);
            throw error.response.data;
        }
    }
}

export default new DoctorsControllers();
