/*
 *
 *  Axios instance to handle all HTTP/HTTPs requests to Backend API
 *
 */

import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
} from "../utils/authToken";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://192.168.1.102:3000/",
});

const axiosRefreshTokenInstance = Axios.create({
  baseURL: "http://192.168.1.102:3000/",
});

const refreshToken = async () => {
  try {
    const refreshToken = await getRefreshToken();
    const accessToken = await getAccessToken();
    const res = await axiosRefreshTokenInstance.post("app/auth/refresh", {
      accessToken,
      refreshToken,
    });
    const newAccessToken = res.headers["access-token"];
    const newRefreshToken = res.headers["refresh-token"];
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);

    return newAccessToken;
  } catch (error) {
    // User should be logged out here.
    console.log(error.response);
  }
};

const AuthInterceptor = () => {
  let interceptor;
  return {
    // Activates authentication interceptor on every request
    activate: () => {
      // Access token refresh logic
      createAuthRefreshInterceptor(
        axios,
        async (failedRequest) => {
          const newAccessToken = await refreshToken();
          failedRequest.response.config.headers["Authorization"] =
            "Bearer " + newAccessToken;
        },
        {
          pauseInstanceWhileRefreshing: true,
        },
      );
      // Access token request patcher
      interceptor = axios.interceptors.request.use(
        async (config) => {
          const accessToken = await getAccessToken();
          config.headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          };
          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
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

// axios.interceptors.request.use(
//   (req) => {
//     console.log("Request >");
//     console.log(req);
//     return req;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (res) => {
//     console.log("Response >");
//     console.log(res);
//     return res;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

export default axios;
