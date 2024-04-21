import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../utils/constants";
import { RootState } from "../../store/store";

export const listingApi = createApi({
    reducerPath: "listingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}`,
        prepareHeaders: (headers, { getState }) => {
            // Retrieve the token from the state
            const { user } = (getState() as RootState).auth;
            const token = user?.accessToken || "";
            const refreshToken = user?.refreshToken || "";

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                headers.set('x-refresh-token', refreshToken)
            }

            return headers;
        },
    }),
    tagTypes: ["listing"],
    endpoints: (builder) => ({
        createListing: builder.mutation({
            query: (data) => ({
                url: `/listings`,
                method: "POST",
                body: data
            }),
        }),
        uploadImages: builder.mutation({
            query: (data) => ({
                url: `/listings/images`,
                method: "POST",
                body: data
            }),
        }),
    }),
});

export const { useCreateListingMutation, useUploadImagesMutation } = listingApi;