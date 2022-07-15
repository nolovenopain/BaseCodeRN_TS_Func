import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
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
  (config: AxiosRequestConfig) => {
    const {
      userReducer: {user},
    } = store.getState();

    if (user?.Token) {
      config.headers = {
        Authorization: `Bearer ${user?.Token}`,
      };
    }

    return config;
  },
  (err: Error | AxiosError) => Promise.reject(err),
);

export default AxiosInstance;
