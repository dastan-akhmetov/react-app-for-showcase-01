import axios from 'axios';
import { isProd } from '../../utils';

const baseUrls = {
  dev: 'https://jsonplaceholder.typicode.com',
  prod: 'https://jsonplaceholder.typicode.com'
};

export const axiosInstance = axios.create({
  baseURL: isProd() ? baseUrls.prod : baseUrls.dev
});
