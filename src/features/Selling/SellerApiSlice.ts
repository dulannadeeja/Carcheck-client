import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../utils/constants";
import { RootState } from "../../store/store";
import { ListingResponseType } from "../listing/listing";

export const sellerApi = createApi({
    reducerPath: "sellerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}`, prepareHeaders: (headers, { getState }) => {
            // Retrieve the token from the state
            const { user } = (getState() as RootState).auth;
            const token = user.accessToken;
            const refreshToken = user.refreshToken;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                headers.set('x-refresh-token', refreshToken)
            }

            return headers;
        },
    }),
    tagTypes: ["Seller"],
    endpoints: (builder) => ({
        getDrafts: builder.query<ListingResponseType[], void>({
            query: () => ({
                url: "/seller/drafts",
                method: "GET",
            }),
        }),
        getListing: builder.query<ListingResponseType, string>({
            query: (id) => ({
                url: `/seller/listing/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetDraftsQuery,useGetListingQuery } = sellerApi;
