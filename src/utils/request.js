import axios from "axios";
import { message } from "antd";

const instance = axios.create();
const logout = () => {
  message.error(`Session Expired`);
  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }, 2000);
};
instance.defaults.baseURL = process.env.REACT_APP_BASE_URL;

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.common.authorization = `Bearer ${token}`; // eslint-disable-line no-param-reassign
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) logout();
    message.error(`(${error.response.status}) ${error.response.data.message}`);
    return Promise.reject(error);
  }
);

export default instance;
