import axios from 'axios';
const AxiosInstance = axios.create({
    // baseURL: 'http://localhost:3000/',
    baseURL: 'https://online-italian-restauraunt.herokuapp.com'
});

export default AxiosInstance;