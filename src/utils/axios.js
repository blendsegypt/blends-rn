/*
 *
 *  Axios instance to handle all HTTP/HTTPs requests to Backend API
 *
 */

const Axios = require("axios");

const axios = Axios.create({
  baseURL: "http://192.168.1.102:3000/",
});

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
