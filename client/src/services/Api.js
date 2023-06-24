import axios from 'axios';
const AxiosInstance = axios.create({
     baseURL: process.env.baseURL || 'http://localhost:3000/'
});

export default AxiosInstance;