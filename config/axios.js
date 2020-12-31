import axios from 'axios';
// require('dotenv').config()

const clienteAxios = axios.create({
    baseURL: `http://localhost:4000/api`
});

export default clienteAxios;