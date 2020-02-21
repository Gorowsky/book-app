import Axios from 'axios';
import ENV from '../config/api';

Axios
  .interceptors
  .request
  .use(config => {
    config.baseURL = ENV.API_URL;
    return config;
  }, error => {
    return Promise.reject(error);
  });