import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Authorization': `token`,
        'Content-Type': 'application/json'
    }
});

export default api;
