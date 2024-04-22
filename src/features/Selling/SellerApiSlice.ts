import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";
import { ListingResponseType, ListingState } from "../listing/listing";
import { SERVER_URL } from "../../utils/constants";

type ListingQueryParams = {
    page: number,
    limit: number,
    sort?: string,
    make?: string,
    model?: string,
    title?: string,
    status?: string,
}

type ListingResponse = {
    data: ListingResponseType[],
    page: number,
    total: number,
    totalPages: number
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
    tagTypes: ["Seller", "drafts", "active"],
    endpoints: (builder) => ({
        // get drafts of the seller's endpoint
        getDrafts: builder.query<ListingResponse, ListingQueryParams>({
            query: (queryParams) => ({
                url: `seller/listings`,
                method: "GET",
                params: {
                    ...queryParams,
                    status: ListingState.draft
                }
            }),
            providesTags: ["Seller", "drafts"],
        }),
        // get active listings of the seller's endpoint
        getActiveListings: builder.query<ListingResponse, ListingQueryParams>({
            query: (queryParams) => ({
                url: `seller/listings`,
                method: "GET",
                params: {
                    ...queryParams,
                    status: ListingState.active
                }
            }),
            providesTags: ["Seller", "active"],
        }),
    }),
});

export const { useGetDraftsQuery } = sellerApi;  
