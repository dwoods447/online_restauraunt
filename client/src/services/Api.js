
import 'dotenv/config'
import axios from 'axios';
const AxiosInstance = axios.create({
     baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:3000/'
});

export default AxiosInstance;