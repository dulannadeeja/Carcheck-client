import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../utils/constants";
import { RootState } from "../../store/store";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${SERVER_URL}`,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from the state
      const { user } = (getState() as RootState).auth;
      if(!user) return headers;
      const token = user.accessToken;
      const refreshToken = user.refreshToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        headers.set('x-refresh-token', refreshToken)
      }

      return headers;
    }, 
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/sessions",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/users",
        method: "POST",
        body: credentials,
      }),
    }),
    searchUser: builder.mutation(
      {
        query: (emailOrUsername: string) => ({
          url: `/users/search`,
          method: "POST",
          body: {
            emailOrUsername,
          },
        }),
      }
    ),
    signout: builder.mutation<void,void>({
      query: () => ({
        url: "/sessions",
        method: "DELETE",
      }),
    })
  }),
});

export const { useSigninMutation,useSignoutMutation, useSignupMutation, useSearchUserMutation } = authApi;
