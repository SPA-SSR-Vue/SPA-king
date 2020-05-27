import Vue from "vue";
import axios from "axios";
import router from "../../router";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "/admin/api",
});

http.interceptors.request.use(
  config => {
    if (localStorage.getItem("king-token")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "king-token"
      )}`;
    }
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
    if (err.response.data.message && err.response.status === 401) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message,
      });
      router.push("/login");
    }
    if (err.response.data.message && err.response.status === 422) {
      Vue.prototype.$message({
        type: "warning",
        message: err.response.data.message,
      });
    }
    return Promise.reject(err);
  }
);

Vue.prototype.$http = http;

export default http;
