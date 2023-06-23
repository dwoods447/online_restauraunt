import axios from 'axios';
// eslint-disable-next-line
console.log('baseURL: ' + process.env.VUE_APP_CLIENT_BASE)
// eslint-disable-next-line
console.log(process.env) // remove this after you've confirmed it is working
const AxiosInstance = axios.create({
     baseURL: process.env.baseURL || 'http://localhost:3000/'
});

export default AxiosInstance;