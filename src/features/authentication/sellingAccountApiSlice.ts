import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../utils/constants";
import { RootState } from "../../store/store";


export const sellingAccountApi = createApi({
    reducerPath: "sellingAccountApi",
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
    tagTypes: ["SellingAccount"],
    endpoints: (builder) => ({
        sendOTP: builder.mutation({
            query: (data) => ({
                url: "/users/verification/send",
                method: "POST",
                body: data,
            }),
        }),
        verifyOTP: builder.mutation({
            query: (data) => ({
                url: "/users/verification/verify",
                method: "POST",
                body: data,
            }),
        }),
        submitRegistration: builder.mutation({
            query: (data) => ({
                url: "/users/seller/register",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useSendOTPMutation,useVerifyOTPMutation, useSubmitRegistrationMutation } = sellingAccountApi;