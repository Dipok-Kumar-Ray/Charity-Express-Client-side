import { createBrowserRouter, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AllDonation from "../donations/allDonation/AllDonation";
import DonationDetails from "../donations/donationDetails/DonationDetails";
import Home from "../Home/Home";
import Register from "../Authentications/Register";
import Login from "../Authentications/Login";
import AuthLayout from "../layouts/AuthLayout";
import NotFound from "../pages/NotFound";
import AboutUs from "../pages/AboutUs/AboutUs";
import MyProfile from "../Dashboard/myProfile/MyProfile";
import RequestCharity from "../Dashboard/requestCharity/RequestCharity";
import Favorites from "../Dashboard/favorites/Favorites";
import MyReviews from "../Dashboard/myReviews/MyReviews";
import TransactionHistory from "../Dashboard/transactionHistory/TransactionHistory";
import SuccessPage from "../Dashboard/transactionHistory/successPage/SuccessPage";
import AdminDashboard from "../Dashboard/AmdinDashboard/AdminDashboard";
import UserManage from "../Dashboard/AmdinDashboard/UserManage";
import Forbidden from "../routes/Forbidden";
import AdminSecure from "../routes/AdminSecure";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "allDonation",
        element: (
          <PrivateRoute>
            <AllDonation></AllDonation>
          </PrivateRoute>
        ),
      },
      {
        path: "donationDetails/:id",
        element: <DonationDetails />,
      },
      {
        path: "aboutUs",
        element: <AboutUs></AboutUs>,
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },

{
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: "my-profile",
      element: <MyProfile />,
    },
    {
      path: "request-charity",
      element: <RequestCharity />,
    },
    {
      path: "favorites",
      element: <Favorites />,
    },
    {
      path: "my-reviews",
      element: <MyReviews />,
    },
    {
      path: "transaction-history",
      element: <TransactionHistory />,
    },
  ],
},
{
  path: 'success',
  element: SuccessPage
},
{
  path: '/adminDashboard',
  element: <AdminSecure> <AdminDashboard ></AdminDashboard></AdminSecure>,
  children: [
    {
      index: true,
      element: <UserManage></UserManage>
    },
    
  ]
  
},

{
      path: '/forbidden',
      element: <Forbidden></Forbidden>
    }


  // {
  //   path: "*",
  //   element: <NotFound></NotFound>,
  // },
]);
