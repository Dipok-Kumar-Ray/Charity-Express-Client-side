import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Authentications/Login";
import Register from "../Authentications/Register";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFound from "../pages/NotFound";
import AddDonation from "../donations/AddDonation";
import AllDonation from "../donations/allDonation/AllDonation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'allDonation',
        element: <PrivateRoute><AllDonation></AllDonation></PrivateRoute>
      }
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
    path: 'donations',
    Component: AddDonation
  }, 
  {
    path: "*",
    Component: NotFound
  }
]);

