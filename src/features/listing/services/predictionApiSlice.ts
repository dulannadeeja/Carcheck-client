import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PREDICTION_URL } from "../../../utils/constants";

export const predictionApi = createApi({
  reducerPath: "predictionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${ PREDICTION_URL }` }),
  tagTypes: ["Prediction"],
  endpoints: (builder) => ({
    predict: builder.mutation({
      query: (data) => ({
        url: "/predict",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePredictMutation } = predictionApi;