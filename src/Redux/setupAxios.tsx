import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import Config from 'react-native-config';
import {store} from './store';

const AxiosInstance = axios.create({
  baseURL: Config.DEV_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const {
      userReducer: {user},
    } = store.getState();

    if (user?.access_token) {
      config.headers.setAuthorization(`Bearer ${user?.access_token}`);
    }

    return config;
  },
  (err: Error | AxiosError) => Promise.reject(err),
);

export default AxiosInstance;
