// services/api.ts

const API_URL = 'https://globalgreen-backend-production.up.railway.app/products'; // Updated API endpoint
const LOGIN_URL = 'https://globalgreen-backend-production.up.railway.app/auth/login'; // Updated login endpoint

export const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Rethrow the error for further handling
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch(LOGIN_URL, { // Use the updated endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data; // Return user data or token as needed
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Rethrow the error for further handling
    }
};