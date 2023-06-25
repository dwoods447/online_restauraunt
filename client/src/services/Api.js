
import axios from 'axios';
// eslint-disable-next-line
console.log(process.env)
// eslint-disable-next-line
console.log(process.env.VUE_APP_CLIENT_BASE)
const AxiosInstance = axios.create({
     baseURL: process.env.VUE_APP_CLIENT_BASE
});

export default AxiosInstance;