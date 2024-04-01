import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: '/api/', // Replace with your API base URL
    timeout: 5000, // Adjust the timeout as needed
    headers: {
        'Content-Type': 'application/json',
        // You can add other common headers here if needed
    },
});

// Add a request interceptor to include the token with every request
instance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('harvestLink-token'); // Get the token from cookies

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
