import axios from "axios";
import {basePath} from '../constants'


export const apiServices = axios.create({
    baseURL: basePath,
    timeout:35000,
    withCredentials: true,

})


apiServices.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("token");

    config.headers ={
        Accept: "application/json,text/plain,*/*",
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
    }
    return config
  },
  (error) => Promise.reject(error)
);