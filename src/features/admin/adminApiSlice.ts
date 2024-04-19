import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../utils/constants";
import { RootState } from "../../store/store";
import { AccountStatus, AccountType, UserDocument } from "../authentication/auth";
import { reject } from "lodash";


export const adminApi = createApi({
    reducerPath: "adminApi",
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
    tagTypes: ["Admin", "PendingAccounts"],
    endpoints: (builder) => ({
        getPendingAccounts: builder.query<UserDocument[],void>({
            query: () => ({
                url: "/users",
                method: "GET",
                query: {
                    accountType: [
                        AccountType.sellerBusiness,
                        AccountType.sellerPersonal,
                        AccountType.serviceProvider
                    ]
                }
            }),
            providesTags: ["Admin", "PendingAccounts"],
        }),
        approveAccount: builder.mutation<UserDocument, string>({
            query: (id) => ({
                url: `/users/${id}/status`,
                method: "PUT",
                body: { accountStatus: AccountStatus.sellingActive }
            }),
        }),
        rejectAccount: builder.mutation<UserDocument, string>({
            query: (id) => ({
                url: `/users/${id}/status`,
                method: "PUT",
                body: { accountStatus: AccountStatus.sellingRestricted }
            }),
        })
    }),
})

export const { useGetPendingAccountsQuery,useApproveAccountMutation,useRejectAccountMutation } = adminApi;

export default adminApi.reducer;