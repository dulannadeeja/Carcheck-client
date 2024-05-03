import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../utils/constants";
import { RootState } from "../../store/store";
import { InspectionRequestType } from "./schema/inspectionRequest.schema";


export const inspectionApi = createApi({
    reducerPath: "inspectionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}`,
        prepareHeaders: (headers, { getState }) => {
            // Retrieve the token from the state
            const { user } = (getState() as RootState).auth;
            const token = user?.accessToken || "";
            const refreshToken = user?.refreshToken || "";

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                headers.set('x-refresh-token', refreshToken);
            }

            return headers;
        },
    }),
    tagTypes: ["Inspection"],
    endpoints: (builder) => ({
        createInspectionRequest: builder.mutation<InspectionRequestType, InspectionRequestType>({
            query: (body) => ({
                url: "/inspection/schedule",
                method: "POST",
                body,
            }),
        }),
    }),
})

export const { useCreateInspectionRequestMutation } = inspectionApi;