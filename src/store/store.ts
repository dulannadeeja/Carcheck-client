import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authentication/authSlice";
import listingReducer from "../features/addListing/listingSlice";
import { authApi } from "../features/authentication/authApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { vehicleApi } from "../features/addListing/vehicleApiSlice";
import { predictionApi } from "../features/listing/services/predictionApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listing: listingReducer,
    [authApi.reducerPath]: authApi.reducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
    [predictionApi.reducerPath]: predictionApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        authApi.middleware,
        vehicleApi.middleware,
        predictionApi.middleware
      )
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;