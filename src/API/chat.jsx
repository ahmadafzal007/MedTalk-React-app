import axios from 'axios';

class ChatControllers {
  constructor() {
    this.apiBaseUrl = 'http://localhost:3000/api/chat';
  }

  // Method to create a chat window
  async createChatWindow(patientId) {
    console.log("Access token", localStorage.getItem('accessToken'))
    try {
      const response = await axios.post(`${this.apiBaseUrl}/create`, { patientId }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Use your token from localStorage or other storage
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating chat window:', error);
      throw error;
    }
  }

  // Method to get all chat windows for a user
  async getUserChats() {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/my-chats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user chats:', error);
      throw error;
    }
  }

  // Method to handle chat requests (upload files, etc.)
  async handleChatRequest(formData) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/generate-response`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data' // Important for file uploads
        }
      });
      return response.data; 
    } catch (error) {
      console.error('Error handling chat request:', error);
      throw error;
    }
  }

  // Method to fetch a single chat window by its ID
  async getChatWindowById(chatId) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/my-chat`, { chatId }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching chat window:', error);
      throw error;
    }
  }

  // Method to get chats without associated patients
  async getChatsWithoutPatient() {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/chat-without-patient`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching chats without patients:', error);
      throw error;
    }
  }

  // Method to get chats with associated patients
  async getChatsWithPatient() {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/chat-with-patient`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching chats with patients:', error);
      throw error;
    }
  }
}

export default new ChatControllers();
