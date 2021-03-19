import axios from 'axios';
// require('dotenv').config()

const clienteAxios = axios.create({
    baseURL: "http://menu.anchoita.com.ar:443/api"
});

export default clienteAxios;