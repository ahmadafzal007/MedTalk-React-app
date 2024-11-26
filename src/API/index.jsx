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
    console.log("user credentials ->",userData)
    try {
      const response = await this.instance.post('/register/user', JSON.stringify(userData),{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async registerDoctor(doctorData) {
    console.log("doctor credentials ->",doctorData)
    try {
      const response = await this.instance.post('/register/doctor', JSON.stringify(doctorData),{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async registerHospital(hospitalData) {
    console.log("hospital credentials ->",hospitalData)
    try {
      const response = await this.instance.post('/register/hospital', JSON.stringify(hospitalData),{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(credentials) {
    console.log("login credentials ->",credentials)
    try {
      const response = await this.instance.post('/login', JSON.stringify(credentials), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
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
