import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";
import { SERVER_URL } from "../../utils/constants";
import { GetSellerListingResponseType, ListingStates } from "./listing/sellerListing";

type ListingQueryParams = {
    page: number,
    limit: number,
    sort?: string,
    make?: string,
    model?: string,
    title?: string,
    status?: string,
}


export const sellerApi = createApi({
    reducerPath: "sellerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth?.user?.accessToken;
            const refreshToken = (getState() as RootState).auth?.user?.refreshToken;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                headers.set('x-refresh-token', refreshToken || '');
            }
            return headers;
        },
    }),
    tagTypes: ["Seller", "drafts", "active", "unsold"],
    endpoints: (builder) => ({
        // get drafts of the seller's endpoint
        getDrafts: builder.query<GetSellerListingResponseType, ListingQueryParams>({
            query: (queryParams) => ({
                url: `seller/listings`,
                method: "GET",
                params: {
                    ...queryParams,
                    status: ListingStates.draft
                }
            }),
            providesTags: ["Seller", "drafts"],
        }),
        // get active listings of the seller's endpoint
        getActiveListings: builder.query<GetSellerListingResponseType, ListingQueryParams>({
            query: (queryParams) => ({
                url: `seller/listings`,
                method: "GET",
                params: {
                    ...queryParams,
                    status: ListingStates.active
                }
            }),
            providesTags: ["Seller", "active"],
        }),
        // get unsold listings of the seller's endpoint
        getUnsoldListings: builder.query<GetSellerListingResponseType, ListingQueryParams>({
            query: (queryParams) => ({
                url: `seller/listings`,
                method: "GET",
                params: {
                    ...queryParams,
                    status: ListingStates.unsold,
                    sold: false
                }
            }),
            providesTags: ["Seller", "unsold"],
        }),
    }),
});

export const { useGetDraftsQuery, useGetActiveListingsQuery, useGetUnsoldListingsQuery } = sellerApi;  
