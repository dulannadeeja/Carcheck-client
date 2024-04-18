import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authentication/authSlice";
import listingReducer from "../features/addListing/listingSlice";
import { authApi } from "../features/authentication/authApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { vehicleApi } from "../features/addListing/vehicleApiSlice";
import { predictionApi } from "../features/addListing/predictionApiSlice";
import { sellerApi } from "../features/Selling/SellerApiSlice";
import inspectionReqReducer from "../features/Selling/inspectionReqSlice";
import { inspectionApi } from "../features/Selling/inspectionReqApiSlice";
import pendingAccountsReducer from "../features/admin/pendingAccounts/pendingAccountsSlice";
import sellingAccountReducer from "../features/authentication/sellingAccountSlice";
import { sellingAccountApi } from "../features/authentication/sellingAccountApiSlice";
import uploadDocsReducer from "../features/authentication/uploadDocuments/uploadDocsSlice";
import { uploadDocsApi } from "../features/authentication/uploadDocuments/uploadDocsApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listing: listingReducer,
    inspectionReq: inspectionReqReducer,
    pendingAccounts: pendingAccountsReducer,
    sellingAccount: sellingAccountReducer,
    uploadDocs: uploadDocsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
    [predictionApi.reducerPath]: predictionApi.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
    [inspectionApi.reducerPath]: inspectionApi.reducer,
    [sellingAccountApi.reducerPath]: sellingAccountApi.reducer,
    [uploadDocsApi.reducerPath]: uploadDocsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        authApi.middleware,
        vehicleApi.middleware,
        predictionApi.middleware,
        sellerApi.middleware,
        inspectionApi.middleware,
        sellingAccountApi.middleware,
        uploadDocsApi.middleware
      )
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
