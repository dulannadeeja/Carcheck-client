import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PREDICTION_URL } from "../utils/constants";

export const predictionApi = createApi({
  reducerPath: "predictionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${PREDICTION_URL}` }),
  tagTypes: ["Prediction"],
  endpoints: (builder) => ({
    predict: builder.mutation({
      query: (data) => ({
        url: "/predict",
        method: "POST",
        body: data,
      }),
    }),
    cleanModel: builder.mutation<{message:string},void>({
      query: () => ({
        url: "/clean",
        method: "DELETE",
      }),
    }),
    loadInitialData: builder.mutation<{message:string},void>({
      query: () => ({
        url: "/load-initial-data",
        method: "GET",
      }),
    }),
    syncData: builder.mutation<{message:string},void>({
      query: () => ({
        url: "/sync-data",
        method: "PUT",
      }),
    }),
    processData: builder.mutation<{message:string},void>({
      query: () => ({
        url: "/process-data",
        method: "GET",
      }),
    }),
    trainModel: builder.mutation<{message:string},void>({
      query: () => ({
        url: "/train-model",
        method: "GET",
      }),
    }),
    getModelInfo: builder.query<{
      message:string
      operationDate: string
      version: string
      accuracy: number
      totalRecords: number
    },void>({
      query: () => ({
        url: "/model-info",
        method: "GET",
      }),
    }),
  }),

});

export const { usePredictMutation,
  useCleanModelMutation,
  useLoadInitialDataMutation,
  useSyncDataMutation,
  useProcessDataMutation,
  useTrainModelMutation,
  useGetModelInfoQuery
 } = predictionApi;