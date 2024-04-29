import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../utils/constants";
import { RootState } from "../../store/store";
import { BidInputData, BidResponse } from "./bidding/bid";
import { GetListingType, ListingFilterOptions } from "./clientListing";

type SingleListingResponse = {
    data: GetListingType,
    message: string,
    success: boolean,
    statusCode: number
}

type Response = {
    data: GetListingType[],
    total: number,
    totalPages: number,
    page: number,
}


export const clientListingApi = createApi({
    reducerPath: "clientListingApi",
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
        createBid: builder.mutation<BidResponse, BidInputData>({
            query: (data) => ({
                url: `/listings/bid/${data.listingId}`,
                method: "POST",
                body: {
                    amount: data.bidAmount
                }
            }),
        }),
        getListing: builder.query<SingleListingResponse, string>({
            query: (id) => ({
                url: `/listings/${id}`,
                method: "GET",
            }),
            providesTags: ["listing"],
        }),
        getListings: builder.query<Response, ListingFilterOptions>({
            query: (data) => ({
                url: "/listings",
                method: "GET",
                params: data
            }),
            providesTags: ["listing"],
        }),
    }),
})

export const { useCreateBidMutation ,useGetListingQuery, useGetListingsQuery} = clientListingApi;

export default clientListingApi;