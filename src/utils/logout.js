import { message } from "antd";

const logout = () => {
  message.error(`Session Expired`);
  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }, 2000);
};
export default logout;
