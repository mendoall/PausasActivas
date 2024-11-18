import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:7085/v1/api/', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default apiClient;