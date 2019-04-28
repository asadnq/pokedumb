import axios from 'axios';
import store from '../store';
import {API_URL} from '../../config/url.config';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(config => {
  const token = store.getState().user.access_token.token;
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
