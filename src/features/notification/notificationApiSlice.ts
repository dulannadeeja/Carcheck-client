import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";
import { SERVER_URL } from "../../utils/constants";
import { NotificationDocument } from "./notificationSlice";


export const notificationApi = createApi({
    reducerPath: "notificationApi",
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
    tagTypes: ["Notification"],
    endpoints: (builder) => ({
        getNotifications: builder.query<NotificationDocument[],void>({
            query: () => ({
                url: "/notifications",
                method: "GET",
            }),
            providesTags: ["Notification"],
        }),
        markAsRead: builder.mutation<NotificationDocument, string>({
            query: (id) => ({
                url: `/notifications/${id}/read`,
                method: "PUT",
            }),
        }),
        markAllAsReadReq: builder.mutation<void, void>({
            query: () => ({
                url: `/notifications/read`,
                method: "PUT",
            }),
        })
    }),
})

export const { useGetNotificationsQuery, useMarkAsReadMutation, useMarkAllAsReadReqMutation } = notificationApi;