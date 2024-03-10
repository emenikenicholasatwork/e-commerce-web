import Cookies from "js-cookie";

const { default: axios } = require("axios");

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {'Authorization': `Bearer ${Cookies.get('token')}`}, 
});

export default axiosInstance;