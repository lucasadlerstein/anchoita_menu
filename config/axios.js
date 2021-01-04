import axios from 'axios';
// require('dotenv').config()

const clienteAxios = axios.create({
    baseURL: `https://anchapi.infinidad.com.ar/api`
});

export default clienteAxios;