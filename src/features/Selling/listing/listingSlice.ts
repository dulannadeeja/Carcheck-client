import { createSlice } from '@reduxjs/toolkit';
import { ListingSchema, validateField } from './schema/listingSchema';
import { GetSellerListingType } from './sellerListing';

const initialErrors = {
    make: "",
    vehicleModel: "",
    manufacturedYear: "",
    registeredYear: "",
    images: "",
    title: "",
    condition: "",
    mileage: "",
    transmission: "",
    fuelType: "",
    bodyType: "",
    driveType: "",
    numberOfDoors: "",
    numberOfSeats: "",
    exteriorColor: "",
    interiorColor: "",
    numberOfPreviousOwners: "",
    maxFuelConsumption: "",
    minFuelConsumption: "",
    engineCapacity: "",
    description: "",
    listingType: "",
    fixedPrice: "",
    auction: {
        duration: "",
        startingBid: "",
        reservePrice: "",
    }
    ,
    location: {
        city: "",
        division: "",
        zipCode: "",
        state: "",
    },
    inspectionReport: "",
    numberOfWatchers: "",
    watchers: "",
    isAllowedOffer: "",
    offer: {
        minimumOffer: "",
        autoAcceptOffer: "",
    }
}

export type ListingErrors = typeof initialErrors;

interface ListingState {
    data: ListingSchema;
    errors: ListingErrors;
    uploadFiles: File[],
    uploadedImages: string[]
}

const initialState: ListingState = {
    data: {
        make: "",
        vehicleModel: "",
        manufacturedYear: 0,
        registeredYear: 0,
        images: [],
        title: "",
        condition: "",
        mileage: -1,
        transmission: "",
        fuelType: "",
        bodyType: "",
        driveType: "",
        exteriorColor: "",
        interiorColor: "",
        numberOfPreviousOwners: 0,
        maxFuelConsumption: 0,
        minFuelConsumption: 0,
        engineCapacity: 0,
        description: "",
        listingType: "",
        fixedPrice: 0,
        location: {
            city: "",
            division: "",
            zipCode: ""
        },
        auction: {
            duration: 0,
            startingBid: 0,
            reservePrice: 0,
        },
        isAllowedOffer: false,
        offer: {
            minimumOffer: 0,
            autoAcceptOffer: 0,
        },
        numberOfDoors: 0,
        numberOfSeats: 0,
    },
    errors: initialErrors,
    uploadFiles: [],
    uploadedImages: []
};


export const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        updateFieldHandler: (state: ListingState, action) => {
            const { field, value } = action.payload;

            // filter nested object paths by splitting the field string by '.'
            if (field.includes(".")) {
                const [parent, child] = field.split(".");
                const parentObject = state.data[parent as keyof ListingSchema];
                if (parentObject) {
                    parentObject[child as keyof typeof parentObject] = value as never;
                }
                return;
            }

            const fieldName = field as keyof ListingSchema;
            state.data[fieldName] = value as never;
        },
        validateFieldHandler: (state, action) => {
            const { field, value } = action.payload;

            const error = validateField(field, value);

            console.log("error", error);

            if (field.includes(".")) {
                const [parent, child] = field.split(".");
                const parentObject = state.errors[parent as keyof ListingErrors];
                if (parentObject) {
                    parentObject[child as keyof typeof parentObject] = error ? error as never : "" as never;
                }
            } else {
                state.errors[field as keyof ListingErrors] = error ? error as never : "" as never;
            }
        },
        clearListing: (state) => {
            state = initialState;
            console.log("state", state);
        },
        clearAllErrors: (state) => {
            state.errors = initialState.errors;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
        addFilesToUpload: (state, action: {
            payload: File[]
        }) => {
            state.uploadFiles = action.payload;
        },
        setUploadedImages: (state, action: {
            payload: string[]
        }) => {
            state.uploadedImages = action.payload;
        },
        setDraftData: (state, action: {
            payload: ListingSchema | GetSellerListingType
        }) => {
            state.data = action.payload as ListingSchema;
            console.log(action.payload);
        }
    }
});

export const { setDraftData, setUploadedImages, addFilesToUpload, updateFieldHandler, setErrors, clearListing, validateFieldHandler, clearAllErrors } = listingSlice.actions;

export default listingSlice.reducer;

