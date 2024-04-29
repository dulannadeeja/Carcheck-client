import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authentication/authSlice";
import listingReducer from "../features/Selling/listing/listingSlice";
import { authApi } from "../features/authentication/authApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { predictionApi } from "../features/Selling/listing/predictionApiSlice";
import { sellerApi } from "../features/Selling/SellerApiSlice";
import inspectionReqReducer from "../features/Selling/inspectionReqSlice";
import { inspectionApi } from "../features/Selling/inspectionReqApiSlice";
import pendingAccountsReducer from "../features/admin/pendingAccounts/pendingAccountsSlice";
import sellingAccountReducer from "../features/authentication/sellingAccountSlice";
import { sellingAccountApi } from "../features/authentication/sellingAccountApiSlice";
import uploadDocsReducer from "../features/authentication/uploadDocuments/uploadDocsSlice";
import { uploadDocsApi } from "../features/authentication/uploadDocuments/uploadDocsApiSlice";
import { adminApi } from "../features/admin/adminApiSlice";
import downloaderReducer from "../features/download/downloaderSlice";
import { notificationApi } from "../features/notification/notificationApiSlice";
import notificationReducer from "../features/notification/notificationSlice";
import { listingApi } from "../features/Selling/listing/listingApiSlice";
import clientListingApi from "../features/listing/clientListingApi";
import clientListingSlice from "../features/listing/clientListingSlice";
import clientApi from "../api/clientApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listing: listingReducer,
    inspectionReq: inspectionReqReducer,
    pendingAccounts: pendingAccountsReducer,
    sellingAccount: sellingAccountReducer,
    uploadDocs: uploadDocsReducer,
    downloader: downloaderReducer,
    notification: notificationReducer,
    clientListing: clientListingSlice,
    [authApi.reducerPath]: authApi.reducer,
    [listingApi.reducerPath]: listingApi.reducer,
    [predictionApi.reducerPath]: predictionApi.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
    [inspectionApi.reducerPath]: inspectionApi.reducer,
    [sellingAccountApi.reducerPath]: sellingAccountApi.reducer,
    [uploadDocsApi.reducerPath]: uploadDocsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [clientListingApi.reducerPath]: clientListingApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        authApi.middleware,
        predictionApi.middleware,
        sellerApi.middleware,
        inspectionApi.middleware,
        sellingAccountApi.middleware,
        uploadDocsApi.middleware,
        adminApi.middleware,
        notificationApi.middleware,
        listingApi.middleware,
        clientListingApi.middleware,
        clientApi.middleware
      )
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
