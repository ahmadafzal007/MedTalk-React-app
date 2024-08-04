
class HospitalController {
  constructor(){
    this.url = "http://localhost:3000/api/v1/healthCareCenter";
  }
  async getAllHospitals (){
    try {
      const response = await fetch(`${this.url}/hospitals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },                                                                                                                
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result)
      return {
        success: true,
        data: result
      };
    } catch (e) {
      console.error("Login error:", e);
      return {
        success: false,
        error: e.message
      };
    }
  }

  async getPendingProfessionals(token) {
    try {
      const response = await fetch(`${this.url}/pendingDoctors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      return {
        success: true,
        data: result
      };
    } catch (e) {
      console.error("Get pending professionals error:", e);
      return {
        success: false,
        error: e.message
      };
    }
  }
}

export default new HospitalController();
