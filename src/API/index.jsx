import axios from 'axios';

class IndexControllers {
  constructor() {
    this.apiUrl = 'http://localhost:3000/api/auth';
    this.instance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setAuthToken(token) {
    if (token) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.instance.defaults.headers.common['Authorization'];
    }
  }

  async registerUser(userData) {
    try {
      const response = await this.instance.post('/register/user', userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async registerDoctor(doctorData) {
    try {
      const response = await this.instance.post('/register/doctor', doctorData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async registerHospital(hospitalData) {
    try {
      const response = await this.instance.post('/register/hospital', hospitalData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(credentials) {
    try {
      const response = await this.instance.post('/login', credentials);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      const response = await this.instance.post('/logout');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async refreshToken() {
    try {
      const response = await this.instance.post('/refresh-token');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return { status: error.response.status, message: error.response.data.message || error.message };
    } else if (error.request) {
      return { status: 500, message: 'No response from server' };
    } else {
      return { status: 500, message: error.message };
    }
  }
}

export default new IndexControllers();
