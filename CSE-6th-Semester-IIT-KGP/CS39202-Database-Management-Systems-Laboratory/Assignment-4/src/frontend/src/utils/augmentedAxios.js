import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../constants";

const AugmentedAxios = axios.create({
  baseURL: `${BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// set interceptor to set default header as access_token (if found)
AugmentedAxios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AugmentedAxios.interceptors.response.use(
  // no errors, go with the flow
  (res) => res,
  // in case of an error
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // cause of error: access_token was expired
      if (
        (err.response.status === 401 || err.response.status === 403) &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;
        try {
          // store the access_token and set into the header
          window.alert("Session expired. Please login again");
          localStorage.removeItem("token");

          window.location.assign(`${FRONTEND_URL}/sign-in`);
          return AugmentedAxios(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

export default AugmentedAxios;
