import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { SERVER_URL } from "../utils/constants";
import { BrandDocument, SpecDocument } from "../features/admin/admin";
import { Vehicle } from "../features/listing/clientListing";
import { SpecsType } from "../features/admin/admin";


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
        // endpoint for getting all brands
        getBrands: builder.query<BrandDocument[], void>({
            query: () => ({
                url: `/brands`,
                method: "GET",
            }),
            providesTags: ["Makes"],
        }),
        getVehicleModelsByMake: builder.query<{
            data: Vehicle[],
            total: number
        }, {
            make: string
        }>({
            query: ({
                make
            }) => ({
                url: `/vehicles/?make=${make}`,
                method: "GET",
            }),
            providesTags: ["client"],
        }),
        getSpecs: builder.query<SpecDocument[],SpecsType>({
            query: (specType) => ({
                url: `/specs/${specType}`,
                method: "GET",
            }),
            providesTags: ["client"],
        }),
    }),
    
})

export const {
    useGetBrandsQuery,
    useGetVehicleModelsByMakeQuery,
    useGetSpecsQuery,
} = clientApi;

export default clientApi;