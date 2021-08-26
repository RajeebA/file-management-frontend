import Home from "../containers/Home";
import SignIn from "../containers/Signin";
import SignUp from "../containers/SignUp";

const mainRoutes = [
  {
    exact: true,
    path: "/",
    name: "Home",
    icon: "home",
    component: Home,
    auth: true
  },
  {
    exact: true,
    path: "/signin",
    name: "Sign In",
    icon: "login",
    component: SignIn
  },
  {
    path: "",
    name: "Sign Up",
    icon: "login",
    component: SignUp
  }
];

export default mainRoutes;
