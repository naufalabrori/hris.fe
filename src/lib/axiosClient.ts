/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { HeadersDefaults } from 'axios';
import Cookies from 'universal-cookie';
import { AUTH_COOKIES_KEY, USER_COOKIES_KEY } from './constant';

const axiosClient: any = axios.create();
const cookies = new Cookies();

axiosClient.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

type headers = {
  'Content-Type': string;
  Accept: string;
  Authorization: string;
};

axiosClient.defaults.withCredentials = false;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
} as headers & HeadersDefaults;

axiosClient.interceptors.request.use(
  (config: any) => {
    try {
      const authStorageData = cookies.get(AUTH_COOKIES_KEY);
      if (!authStorageData) return config;

      const authToken = authStorageData?.state?.token;

      if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
        // For debugging:
        console.log('Token being set:', authToken);
        console.log('Headers:', config.headers);
      }
    } catch (error) {
      console.error('Error parsing auth cookie:', error);
      console.error('Cookie value:', cookies.get(AUTH_COOKIES_KEY));
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response.status === 401) {
      cookies.remove(USER_COOKIES_KEY, { path: '/' });
      cookies.remove(AUTH_COOKIES_KEY, { path: '/' });
    }
    throw error;
  }
);

export default axiosClient;
