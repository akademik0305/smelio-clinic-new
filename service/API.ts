import axios, { type AxiosInstance } from "axios";


const createAxiosInstance = (): AxiosInstance => {
  // const config = useRuntimeConfig();
  // const baseUrl = config.public.apiBaseUrl;

  return axios.create({
    baseURL: 'https://delivery.lidertaxi.uz/api/delivery'
  });
};

export default createAxiosInstance;
