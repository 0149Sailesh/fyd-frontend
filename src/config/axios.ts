import axios from 'axios';

import { backendUrl } from './config';

const axiosInstance = axios.create({
  baseURL: backendUrl,
  // headers: {
  //   Authorization: `Bearer ${token || 'xxxx-xxxx-xxxx'}`,
  // },
});

export default axiosInstance;
