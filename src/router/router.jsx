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
import RequestCharity from "../Dashboard/requestCharity/RequestCharity";
import Favorites from "../Dashboard/favorites/Favorites";
import SuccessPage from "../Dashboard/transactionHistory/successPage/SuccessPage";
import AdminDashboard from "../Dashboard/AmdinDashboard/AdminDashboard";
import UserManage from "../Dashboard/AmdinDashboard/UserManage";
import Forbidden from "../routes/Forbidden";
import AdminSecure from "../routes/AdminSecure";
import MyProfile from "../UserDashboardRole/myProfile/MyProfile";
import MyReviews from "../UserDashboardRole/myReviews/MyReviews";
import TransactionHistory from "../UserDashboardRole/transactionHistory/TransactionHistoy";
import RestaurantProfile from "../RestaurantDashboardLayout/RestaurantProfile.jsx/RestaurantProfile";
import AddDonation from "../RestaurantDashboardLayout/addDonation.jsx/AddDonation";
import MyDonations from "../RestaurantDashboardLayout/myDonations/MyDonations";
import RequestedDonations from "../RestaurantDashboardLayout/requestedDonation/RequestedDonations";
import RestaurantRoute from "../RestaurantDashboardLayout/restaurantRoute/RestaurantRoute";

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

//users dashboard layout
{
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    // {
    //   path: 'addDonation',
    //   element: <AddDonation></AddDonation>
    // },
    {
      path: "my-profile",
      element: <MyProfile></MyProfile>
      // element: <MyProfile />,
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
      element: <MyReviews></MyReviews>
    },
    {
      path: "transaction-history",
      element: <TransactionHistory></TransactionHistory>
    },
  ],
},

//restaurant dashboard
{
  path:'/restaurant-dashboard',
  element:<RestaurantRoute><RestaurantDashboardLayout></RestaurantDashboardLayout></RestaurantRoute>,
  
  children: [
    {
      path:'restaurant-profile' ,
      element: <RestaurantProfile></RestaurantProfile>
    },
    {
      path: 'addDonation',
      element: <AddDonation></AddDonation>
    },
    {
      path: 'my-donations',
      element: <MyDonations></MyDonations>
    },
    {
      path: 'requested-donations',
      element: <RequestedDonations></RequestedDonations>
    }
  ]
},

//charity dashboard
{
  path: '/charity-dashboard',
  element: 

},

//admin dashboard
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
  path: 'success',
  element: SuccessPage
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
