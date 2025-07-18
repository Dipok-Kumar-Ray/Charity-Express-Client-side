import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AllDonation from "../donations/allDonation/AllDonation";
import DonationDetails from "../donations/donationDetails/DonationDetails";
import Home from "../Home/Home";
import Register from "../Authentications/Register";
import Login from "../Authentications/Login";
import AuthLayout from "../layouts/AuthLayout";
import AddDonation from "../donations/AddDonation";
import NotFound from "../pages/NotFound";
import AboutUs from "../pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'allDonation',
        element: <PrivateRoute><AllDonation></AllDonation></PrivateRoute>
      }, 
      {
        path: 'donationDetails/:id',
        element: <DonationDetails/>
      },
      {
        path: 'aboutUs',
        element: <AboutUs></AboutUs>
      }
    ],
  },

  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      },
    ],
  },

  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
  },
  {
    path: 'donations',
    element: <AddDonation></AddDonation>
  }, 
  {
    path: "*",
    element: <NotFound></NotFound>
  }
]);

