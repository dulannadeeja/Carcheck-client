import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../../utils/constants";
import { RootState } from "../../../store/store";

export const uploadDocsApi = createApi({
    reducerPath: "uploadDocsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}`,
        prepareHeaders: (headers, { getState }) => {
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
    tagTypes: ["uploadDocs"],
    endpoints: (builder) => ({
        submitDocs: builder.mutation({
            query: (data) => ({
                url: `/users/seller/documents`,
                method: "POST",
                body: data
            }),
        })
    }),
})

export const { useSubmitDocsMutation } = uploadDocsApi; 