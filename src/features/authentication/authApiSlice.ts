import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../utils/constants";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}` }),
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
  }),
});

export const { useSigninMutation, useSignupMutation } = authApi;
