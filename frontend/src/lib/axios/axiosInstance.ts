"use client";
import { authKey } from "@/constants/storageKey";
import axios from "axios";
import { getFromLocalStorage } from "../localStorage/localStorage";

const instance = axios.create();
instance.defaults.baseURL =
  process.env.NEXT_PUBLIC_BACKEND_API;
instance.defaults.headers.post["Content-Type"] =
  "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


export { instance };
