/*
 *
 *  Axios instance to handle all HTTP/HTTPs requests to Backend API
 *
 */
import { getToken } from "../utils/authToken";

const Axios = require("axios");

const axios = Axios.create({
  baseURL: "http://192.168.1.102:3000/",
});

const AuthInterceptor = () => {
  let interceptor;
  return {
    // Activates authentication interceptor on every request
    activate: () => {
      interceptor = axios.interceptors.request.use(
        async (config) => {
          const accessToken = await getToken("access-token");
          config.headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          };
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    // Deactivates authentication interceptor
    deactivate: () => {
      axios.interceptors.request.eject(interceptor);
    },
  };
};

export const authInterceptor = AuthInterceptor();

/*

  DEBUGGING ONLY

*/

axios.interceptors.request.use(
  (req) => {
    console.log(req);
    return req;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axios;
