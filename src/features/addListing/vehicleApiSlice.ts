import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../utils/constants";

export const vehicleApi = createApi({
    reducerPath: "vehicleApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}` }),
    tagTypes: ["vehicle"],
    endpoints: (builder) => ({
        getVehicleModels: builder.query({
            query: (make) => ({
                url: `/vehicles/models?make=${make}`,
                method: "GET",
            }),
        })
    }),
});

export const { useGetVehicleModelsQuery } = vehicleApi;

