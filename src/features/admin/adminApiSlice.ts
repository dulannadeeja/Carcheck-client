import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../utils/constants";
import { RootState } from "../../store/store";
import { AccountStatus, AccountType, UserDocument } from "../authentication/auth";
import { BrandDocument, SpecDocument, SpecsType } from "./admin";
import { Vehicle } from "../listing/clientListing";


export const adminApi = createApi({
    reducerPath: "adminApi",
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
    tagTypes: ["Admin", "PendingAccounts", "Brands", "Categories", "vehicles", "Specs", "TransmissionType", "FuelType", "DriveType", "ColorOptions"],
    endpoints: (builder) => ({
        getPendingAccounts: builder.query<{
            data: UserDocument[],
            page: number,
            total: number
            totalPages: number
        }, {
            page: number,
            limit: number
        }>({
            query: ({
                page,
                limit
            }) => ({
                url: `/users`,
                method: "GET",
                params: {
                    accountType: [
                        AccountType.sellerBusiness,
                        AccountType.sellerPersonal,
                        AccountType.serviceProvider
                    ],
                    page,
                    limit,
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
        }),
        addBrand: builder.mutation<BrandDocument, { name: string }>({
            query: (data) => ({
                url: `/brands`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Brands"],
        }),
        getBrands: builder.query<BrandDocument[], void>({
            query: () => ({
                url: `/brands`,
                method: "GET",
            }),
            providesTags: ["Admin", "Brands"],
        }),
        deleteBrand: builder.mutation<BrandDocument, string>({
            query: (id) => ({
                url: `/brands/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Brands"],
        }),
        editBrand: builder.mutation<BrandDocument, { id: string, name: string, index: number }>({
            query: (data) => ({
                url: `/brands/${data.id}`,
                method: "PUT",
                body: {
                    name: data.name,
                    index: data.index
                }
            }),
            invalidatesTags: ["Brands"],
        }),
        getSpecs: builder.query<SpecDocument[], string>({
            query: (specType) => ({
                url: `/specs/${specType}`,
                method: "GET",
            }),
            providesTags: ["Specs"],
        }),
        addSpec: builder.mutation<SpecDocument, { name: string, specType: SpecsType }>({
            query: (data) => ({
                url: `/specs/`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Specs"],
        }),
        editSpec: builder.mutation<SpecDocument, { id: string, name: string, specType: SpecsType }>({
            query: (data) => ({
                url: `/specs/${data.id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Specs"],
        }),
        deleteSpec: builder.mutation<SpecDocument, { id: string, specType: SpecsType }>({
            query: ({
                id,
                specType
            }) => ({
                url: `/specs/${specType}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Specs"],
        }),
        getVehiclesModels: builder.query<{
            data: Vehicle[],
            page: number,
            total: number
            totalPages: number
        }, {
            make: string,
            category: string,
            page: number,
            limit: number
            sort: string
        }>({
            query: ({
                make,
                category,
                page,
                limit,
                sort
            }) => ({
                url: `/vehicles/?make=${make}&category=${category}&page=${page}&limit=${limit}&sort=${sort}`,
                method: "GET",
            }),
            providesTags: ["vehicles"],
        }),
        deleteVehicleModel: builder.mutation<Vehicle, string>({
            query: (id) => ({
                url: `/vehicles/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["vehicles"],
        }),
        createVehicleModel: builder.mutation<Vehicle, { make: string, vehicleModel: string, category: string[] }>({
            query: (data) => ({
                url: `/vehicles`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["vehicles"],
        }),
        editVehicleModel: builder.mutation<Vehicle, { id: string, make: string, vehicleModel: string, category: string[] }>({
            query: (data) => ({
                url: `/vehicles/${data.id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["vehicles"],
        }),
    }),
})

export const { useDeleteBrandMutation, useEditBrandMutation, useGetBrandsQuery, useGetPendingAccountsQuery, useApproveAccountMutation, useRejectAccountMutation, useAddBrandMutation
    , useGetSpecsQuery, useAddSpecMutation, useEditSpecMutation, useDeleteSpecMutation, useGetVehiclesModelsQuery, useDeleteVehicleModelMutation, useCreateVehicleModelMutation, useEditVehicleModelMutation
} = adminApi;

export default adminApi.reducer;