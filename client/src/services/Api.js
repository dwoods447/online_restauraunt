
import 'dotenv/config'
import axios from 'axios';
console.log('baseURL: ' + process.env.baseUR)
console.log(process.env) // remove this after you've confirmed it is working
const AxiosInstance = axios.create({
     baseURL: process.env.baseURL || 'http://localhost:3000/'
});

export default AxiosInstance;