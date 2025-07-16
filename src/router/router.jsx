import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Authentications/Login";
import Register from "../Authentications/Register";
import PrivateRoute from "../routes/PrivateRoute";
import SendDonation from "../donations/SendDonation";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
  },
  {
    path: 'send-donation',
    Component: SendDonation
  }
]);
