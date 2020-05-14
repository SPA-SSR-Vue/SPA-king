import Vue from "vue";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/web/api",
  timeout: 5000,
});

http.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    return Promise.reject(err);
  }
);

Vue.prototype.$http = http;

export default http;
