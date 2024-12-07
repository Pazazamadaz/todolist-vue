import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5000', // Set your base URL here
    //baseURL: 'https://todolist-api-g2g8gvgmgagwdyh6.uksouth-01.azurewebsites.net/'
});

// Add a request interceptor
http.interceptors.request.use((config) => {
    
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the header
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor (optional)
http.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Handle 401 error (unauthorized) here if needed
        console.error('Unauthorized access - redirecting to login...');
        // Optionally, you can add a redirect to the login page
    }
    return Promise.reject(error);
});

export default http;
