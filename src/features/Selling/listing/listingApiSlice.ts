import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ListingResponseType, ListingState, Vehicle } from "../../listing/listing";
import { ListingSchema } from "./schema/listingSchema";
import { RootState } from "../../../store/store";
import { SERVER_URL } from "../../../utils/constants";
import { BrandDocument, SpecDocument, SpecsType } from "../../admin/admin";


export const listingApi = createApi({
    reducerPath: "listingApi",
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
    tagTypes: ["listing","Makes","Models","Specs"],
    endpoints: (builder) => ({
        // endpoint for creating a new listing
        createListing: builder.mutation({
            query: (data) => ({
                url: `/listings`,
                method: "POST",
                body: data
            }),
        }),
        // endpoint for updating a listing
        updateListing: builder.mutation<ListingResponseType,{
            data: ListingSchema & {
                status: ListingState
            }
            id: string
        }>({
            query: ({ id,
                data
             }) => ({
                url: `/listings/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: [],
        }),
        // endpoint for getting a listing
        getListing: builder.query<ListingResponseType, string>({
            query: (id) => ({
                url: `/listings/${id}`,
                method: "GET",
            }),
            providesTags: ["listing"],
        }),
        uploadImages: builder.mutation({
            query: (data) => ({
                url: `/listings/images`,
                method: "POST",
                body: data
            }),
        }),
        // endpoint for getting vehicle models by make
        getVehicleModelsByMake: builder.query<{
            data: Vehicle[],
            page: number,
            total: number
            totalPages: number
        }, {
            make: string,
            category?: string,
            page?: number,
            limit?: number
            sort?: string
        }>({
            query: ({
                make,
                category="",
                page=1,
                limit=999999,
                sort=1
            }) => ({
                url: `/vehicles/?make=${make}&category=${category}&page=${page}&limit=${limit}&sort=${sort}`,
                method: "GET",
            }),
            providesTags: ["listing","Models"],
        }),
        // endpoint for getting all brands
        getBrands: builder.query<BrandDocument[], void>({
            query: () => ({
                url: `/brands`,
                method: "GET",
            }),
            providesTags: ["Makes"],
        }),
        // endpoint for getting all specs
        getSpecs: builder.query<SpecDocument[], SpecsType>({
            query: (specType) => ({
                url: `/specs/${specType}`,
                method: "GET",
            }),
            providesTags: ["Specs"],
        })
    }),
});

export const { useUpdateListingMutation,useGetListingQuery,useCreateListingMutation, useUploadImagesMutation ,useGetVehicleModelsByMakeQuery, useGetBrandsQuery, useGetSpecsQuery} = listingApi;