import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { SERVER_URL } from "../utils/constants";

type BidData = {
    listingId: string;
    bidAmount: number;
}

type BidResponse = {
    message: string;
    success: boolean;
}


export const clientApi = createApi({
    reducerPath: "clientApi",
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
    tagTypes: ["client", "Makes", "Models", "Specs"],
    endpoints: (builder) => ({
        putBid: builder.mutation<BidResponse, BidData>({
            query: (data) => ({
                url: `/listing/bid`,
                method: "PUT",
                body: data
            }),
        })
    }),
})