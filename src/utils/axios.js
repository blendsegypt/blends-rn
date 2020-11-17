/*
 *
 *  Axios instance to handle all HTTP/HTTPs requests to Backend API
 *
 */

const Axios = require("axios");

const axios = Axios.create({
  baseURL: "http://192.168.1.102:3000/",
});

export default axios;
