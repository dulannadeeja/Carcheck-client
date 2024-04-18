import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "react-calendar/dist/Calendar.css";
import "./styles/Calendar.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddListing,
  BidsAndOffers,
  Home,
  Listing,
  Listings,
  MyCarcheck,
  RecentlyViewed,
  SignIn,
  Signup,
  Summary,
} from "./Routes.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BuyerProtectedRoute from "./components/BuyerProtectedRoutes.tsx";
import Selling from "./features/Selling/pages/Selling.tsx";
import Drafts from "./features/Selling/components/Drafts.tsx";
import Active from "./features/Selling/components/Active.tsx";
import ScheduledInspections from "./features/Selling/components/ScheduledInspections.tsx";
import RequestInspection from "./features/Selling/pages/RequestInspection.tsx";
import Dashborad from "./features/admin/pages/dashboard.tsx";
import ActiveAccounts from "./features/admin/components/ActiveAccounts.tsx";
import PendingAccounts from "./features/admin/pendingAccounts/PendingAccounts.tsx";
import Activity from "./features/admin/components/Activity.tsx";
import StartSelling from "./features/authentication/setupSellingAccount/pages/StartSelling.tsx";
import SetupSellingAccount from "./features/authentication/setupSellingAccount/pages/SetupSellingAccount.tsx";
import BusinessInfo from "./features/authentication/setupSellingAccount/components/BusinessInfo.tsx";
import IdentityInfo from "./features/authentication/setupSellingAccount/components/IdentityInfo.tsx";
import FinancialInfo from "./features/authentication/setupSellingAccount/components/FinancialInfo.tsx";
import SubmitRegistration from "./features/authentication/setupSellingAccount/components/SubmitRegistration.tsx";
import ContactInfo from "./features/authentication/setupSellingAccount/components/ContactInfo.tsx";
import UploadFile from "./features/authentication/uploadDocuments/components/UploadFile.tsx";
import UploadDocuments from "./features/authentication/uploadDocuments/pages/UploadDocuments.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/listings",
    element: <Listings />,
  },
  {
    path: "/listing/:id",
    element: <Listing />,
  },
  {
    path: "/addlisting",
    element: (
      <BuyerProtectedRoute>
        <AddListing />
      </BuyerProtectedRoute>
    ),
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/myCarcheck",
    element: <MyCarcheck />,
    children: [
      {
        path: "",
        element: <Summary />,
      },
      {
        path: "recentlyViewed",
        element: <RecentlyViewed />,
      },
      {
        path: "bidsAndOffers",
        element: <BidsAndOffers />,
      },
    ],
  },
  {
    path: "/selling",
    element: <Selling />,
    children: [
      {
        path: "",
        element: <Summary />,
      },
      {
        path: "drafts",
        element: <Drafts />,
      },
      {
        path: "active",
        element: <Active />,
      },
      {
        path: "inspection/scheduled",
        element: <ScheduledInspections />,
      },
    ],
  },
  {
    path: "/selling/inspection/request/:listingId",
    element: <RequestInspection />,
  },
  {
    path: "/admin",
    element: <Dashborad />,
    children: [
      {
        path: "activity",
        element: <Activity />,
      },
      {
        path: "accounts/active",
        element: <ActiveAccounts />,
      },
      {
        path: "accounts/pending",
        element: <PendingAccounts />,
      },
    ],
  },
  {
    path: "/selling/start-selling",
    element: <StartSelling />,
  },
  {
    path: "/selling/register",
    element: <SetupSellingAccount />,
    children: [
      {
        path: "",
        element: <ContactInfo />,
      },
      {
        path: "business-info",
        element: <BusinessInfo />,
      },
      {
        path: "identity-info",
        element: <IdentityInfo />,
      },
      {
        path: "financial-info",
        element: <FinancialInfo />,
      },
      {
        path: "submit-registration",
        element: <SubmitRegistration />,
      },
    ],
  },
  {
    path: "/seller/upload-documents",
    element: <UploadDocuments />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
