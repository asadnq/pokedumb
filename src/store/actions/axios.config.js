import axios from 'axios';
import store from '../store';

const instance = axios.create({
    baseURL: 'http://192.168.0.17:3333/api/v1'
});

export default instance;