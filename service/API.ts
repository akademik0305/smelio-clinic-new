import axios, { type AxiosInstance } from "axios";


const createAxiosInstance = (): AxiosInstance => {
  // const config = useRuntimeConfig();
  // const baseUrl = config.public.apiBaseUrl;

  return axios.create({
    baseURL: 'https://api.markazi.uz/api'
  });
};

export default createAxiosInstance;
