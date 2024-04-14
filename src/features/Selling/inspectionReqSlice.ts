


import { createSlice } from "@reduxjs/toolkit";
import { validateField } from "./schema/inspectionRequest.schema";

interface InspectionReqState {
    serviceProvider: string;
    serviceBranch: string;
    inspectionDate: Date | null;
    inspectionTime: Date | null;
    contactNumber: string;
    errors: {
        serviceProvider: string;
        serviceBranch: string;
        inspectionDate: string;
        inspectionTime: string;
        contactNumber: string;
    }
}


const initialState:InspectionReqState = {
    serviceProvider: "",
    serviceBranch: "",
    inspectionDate: null,
    inspectionTime: null,
    contactNumber: "",
    errors: {
        serviceProvider: "",
        serviceBranch: "",
        inspectionDate: "",
        inspectionTime: "",
        contactNumber: ""
    }
}


export const inspectionReqSlice = createSlice({
    name: 'inspectionReq',
    initialState,
    reducers: {
        updateFieldHandler: (state: typeof initialState, action) => {
            const { field, value } = action.payload;
            state[field as keyof typeof state] = value as never;
        },
        validateFieldHandler: (state, action) => {
            const { field, value } = action.payload;
            const error = validateField(field, value);
            if(error) {
                state.errors[field as keyof typeof state.errors] = error;
            }else{
                state.errors[field as keyof typeof state.errors] = "";
            }
        },
        clearInspectionReq: (state) => {
            state = initialState;
            console.log("state", state);
        },
        clearAllErrors: (state) => {
            state.errors = initialState.errors;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        }
    }
});

export const { updateFieldHandler, setErrors, clearInspectionReq, validateFieldHandler, clearAllErrors } = inspectionReqSlice.actions;

export default inspectionReqSlice.reducer;