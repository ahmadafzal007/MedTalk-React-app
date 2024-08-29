class Authentication {
  constructor() {
    this.url = "http://localhost:3000/api/v1/auth";
  }

  async signup(data) {
    try {
      const response = await fetch(`${this.url}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result,
      };
    } catch (e) {
      console.error("Signup error:", e);
      return {
        success: false,
        error: e.message,
      };
    }
  }

  async login(data) {
    try {
      const response = await fetch(`${this.url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      return {
        success: true,
        data: result,
      };
    } catch (e) {
      console.error("Login error:", e);
      return {
        success: false,
        error: e.message,
      };
    }
  }
}

export default new Authentication();
