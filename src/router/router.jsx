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
import NotFound from "../pages/NotFound";
import AboutUs from "../pages/AboutUs/AboutUs";
// import RequestCharity from "../Dashboard/requestCharity/RequestCharity";
import Favorites from "../Dashboard/favorites/Favorites";
import SuccessPage from "../Dashboard/transactionHistory/successPage/Success";
import Forbidden from "../routes/Forbidden";
import MyProfile from "../UserDashboardRole/myProfile/MyProfile";
import MyReviews from "../UserDashboardRole/myReviews/MyReviews";
import TransactionHistory from "../UserDashboardRole/transactionHistory/TransactionHistoy";
import RestaurantRoute from "../RestaurantDashboardLayout/restaurantRoute/RestaurantRoute";
import RestaurantDashboardLayout from "../RestaurantDashboardLayout/RestaurantDashboardLayout";
import CharityProfile from "../CharityDashboardLayout/charityProfile/CharityProfile";
import CharityDashboardLayout from "../CharityDashboardLayout/charityDashboardLayout/CharityDashboardLayout";
import MyRequests from "../CharityDashboardLayout/myRequests/MyRequests";
import MyPickups from "../CharityDashboardLayout/myPickups/MyPickups";
import ReceivedDonations from "../CharityDashboardLayout/receivedDonations/ReceivedDonations";
import TransactionsHistory from "../CharityDashboardLayout/transactionHistory/TransactionsHistory";
import RestaurantProfile from "../RestaurantDashboardLayout/RestaurantProfile.jsx/RestaurantProfile";
import AddDonation from "../RestaurantDashboardLayout/addDonation.jsx/AddDonation";
import MyDonations from "../RestaurantDashboardLayout/myDonations/MyDonations";
import RequestedDonations from "../RestaurantDashboardLayout/requestedDonation/RequestedDonations";
// import AdminRoute from "../AdminDashboardLagyouts/adminRoute/AdminRoute";
import AdminDashboardLayouts from "../AdminDashboardLagyouts/adminDahboard/AdminDashboardLayout/AdminDashboardLayouts";
import AdminProfile from "../AdminDashboardLagyouts/adminProfile/AdminProfile";
import ManageUsers from "../AdminDashboardLagyouts/manageUsers/ManageUsers";
import ManageRoleRequests from "../AdminDashboardLagyouts/manageRoleRequests/ManageRoleRequests";
import ManageRequests from "../AdminDashboardLagyouts/manageRequests/ManageRequests";
import FeatureDonations from "../AdminDashboardLagyouts/featureDonations/FeatureDonations";
import ManageDonations from "../AdminDashboardLagyouts/manageDonatons/ManageDonations";
import RequestCharityRole from "../UserDashboardRole/requestCharityRole/RequestCharityRole";
import DonationStatistics from "../featureDonations/DonationStatistics";
// import AdminRoute from "../AdminDashboardLagyouts/adminRoute/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "allDonation",
        element: (
          <PrivateRoute>
            <AllDonation />
          </PrivateRoute>
        ),
      },
      {
        path: "donationDetails/:id",
        element: <DonationDetails />,
      }, 
      {
        path: 'donations/:id',
        element: <DonationDetails/>
      },
      {
        path: "aboutUs",
        element: <AboutUs />,
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  // user dashboard
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
        element:<RequestCharityRole/> 
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

  // restaurant dashboard
  {
    path: "restaurant-dashboard",
    element: (
      <RestaurantRoute>
        <RestaurantDashboardLayout />
      </RestaurantRoute>
    ),
    // element: <RestaurantDashboardLayout/>,
    children: [
      {
        path: "restaurant-profile",
        element: <RestaurantProfile/>
      },
      {
        path: "addDonation",
        element: <AddDonation/>
      },
      {
        path: "my-donations",
        element:<MyDonations/>
      },
      {
        path: "requested-donations",
      element: <RequestedDonations/>
      },
      {
        path: 'feature-donations',
        element: <FeatureDonations/>
      },

    ],
  },

  // charity dashboard
  {
    path: "charity-dashboard",
    element: (
      <PrivateRoute>
       <RestaurantRoute><CharityDashboardLayout></CharityDashboardLayout></RestaurantRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "charity-profile",
        element: <CharityProfile />,
      },
      {
        path: "my-requests",
        element: <MyRequests />,
      },
      {
        path: "my-pickups",
        element: <MyPickups />,
      },
      {
        path: "received-donations",
        element: <ReceivedDonations />,
      },
      {
        path: "transaction-history",
        element: <TransactionsHistory />,
      },
    ],
  },

  // admin dashboard
  {
    path: "/admin-dashboard",
    // element:<PrivateRoute><AdminDashboardLayouts></AdminDashboardLayouts></PrivateRoute>, 
    element: <PrivateRoute><RestaurantRoute><AdminDashboardLayouts></AdminDashboardLayouts></RestaurantRoute></PrivateRoute>,
    children: [
      {
        path: "profile",
        element: <AdminProfile/>
      },
      {
        path: 'manage-donations',
        element: <ManageDonations/>
      },
      {
        path: 'manage-users',
        element: <ManageUsers/>
      },
      {
        path: 'manage-role-requests',
        element: <ManageRoleRequests/>
      },
      {
        path: 'manage-requests',
        element: <ManageRequests/>
      },
      {
        path: 'feature-donations',
        element: <FeatureDonations/>
      }
    ],
  },

  {
    path: "success",
    element: <SuccessPage />,
  },

  {
    path: "/forbidden",
    element: <Forbidden />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
