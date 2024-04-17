import { createSlice } from "@reduxjs/toolkit";
import { validateField } from "./setupSellingAccount/schema/sellingAccountSchema";
import { AccountType } from "./auth";

const initialState = {
    data: {
        phone: "",
        phoneOTP: "",
        phoneVerified: false,
        email: "",
        emailOTP: "",
        emailVerified: false,
        accountType: AccountType.sellerPersonal,
        personalInfo: {
            firstName: "",
            lastName: "",
            drivingLicense: "",
            nationalId: "",
            passportNo: "",
        },
        personalInfoVerified: false,
        businessAddress: {
            street: "",
            streetLine2: "",
            city: "",
            division: "",
            zip: "",
        },
        businessAddressVerified: false,
        businessInfo: {
            businessName: "",
            businessRegNo: "",
            businessWebsite: "",
            ownershipType: "",
        },
        businessInfoVerified: false,
        financialInfo: {
            bankName: "",
            accountName: "",
            accountNumber: "",
            branchCode: ""
        },
        financialInfoVerified: false
    },
    errors: {
        phone: "",
        phoneOTP: "",
        email: "",
        emailOTP: "",
        businessType: "",
        businessAddress: {
            street: "",
            streetLine2: "",
            city: "",
            division: "",
            zip: "",
        },
        personalInfo: {
            firstName: "",
            lastName: "",
            drivingLicense: "",
            nationalId: "",
            passportNo: "",
        },
        businessInfo: {
            businessName: "",
            businessRegNo: "",
            businessWebsite: "",
            ownershipType: "",
        },
        financialInfo: {
            bankName: "",
            accountName: "",
            accountNumber: "",
            branchCode: ""
        }
    }
}

type TData = typeof initialState.data;
type TErrors = typeof initialState.errors;

export const sellingAccountSlice = createSlice({
    name: 'setupSelling',
    initialState,
    reducers: {
        updateFieldHandler: (state: typeof initialState, action) => {
            const { field, value } = action.payload;

            if (field.includes(".")) {
                const [parent, child] = field.split(".");
                const parentObject = state.data[parent as keyof TData];
                if (parentObject) {
                    parentObject[child as keyof typeof parentObject] = value as never;
                }
                return;
            }

            const fieldName = field as keyof TData;
            state.data[fieldName] = value as never;
        },
        validateFieldHandler: (state, action) => {
            const { field, value } = action.payload;

            const error = validateField(field, value);

            if (field.includes(".")) {
                const [parent, child] = field.split(".");
                const parentObject = state.errors[parent as keyof TErrors];
                if (parentObject) {
                    parentObject[child as keyof typeof parentObject] = error ? error as never : "" as never;
                }
            } else {
                state.errors[field as keyof TErrors] = error ? error as never : "" as never;
            }
        },
        setError: (state, action) => {
            const { field, error } = action.payload;
            state.errors[field as keyof typeof state.errors] = error;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
        resetErrors: (state) => {
            state.errors = initialState.errors;
        },
        resetEmailVerification: (state) => {
            state.data.emailVerified = false;
            state.data.emailOTP = "";
            state.errors.emailOTP = "";
        },
        resetPhoneVerification: (state) => {
            state.data.phoneVerified = false;
            state.data.phoneOTP = "";
            state.errors.phoneOTP = "";

        }
    }
});

export const { updateFieldHandler, validateFieldHandler, setError, setErrors, resetErrors, resetEmailVerification, resetPhoneVerification } = sellingAccountSlice.actions;

export default sellingAccountSlice.reducer;