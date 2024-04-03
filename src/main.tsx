import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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
    element: <AddListing />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
