import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../utils/constants";

export const listingApi = createApi({
    reducerPath: "listingApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}` }),
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