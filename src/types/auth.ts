export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      phone: string;
      role: string;
    };
  }
  