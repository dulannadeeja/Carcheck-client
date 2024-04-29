import { createSlice } from '@reduxjs/toolkit';
import { listingSchema, ListingSchema} from './schema/listingSchema';
import { GetSellerListingType } from './sellerListing';
import { validateSchemaField} from '../../../lib/validation';
import { updateObjectField } from '../../../utils/objectHelper';

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
    dataNeedToBeSaved: boolean;
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
        mileage: 0,
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
    dataNeedToBeSaved: false,
};


export const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        updateAndValidateFieldHandler: (state: ListingState, action) => {
            const { field, value } = action.payload;

            state.data = updateObjectField<ListingSchema>(state.data, field, value);

            const error = validateSchemaField<ListingSchema>(listingSchema, field, value);

            if(error){
                state.errors = updateObjectField<ListingErrors>(state.errors, field, error);
            }else{
                state.errors = updateObjectField<ListingErrors>(state.errors, field, "");
            }

            // set the flag to indicate that the data has been changed
            state.dataNeedToBeSaved = true;
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
        setDraftData: (state, action: {
            payload: ListingSchema | GetSellerListingType
        }) => {
            // set only the fields that are present in the payload
            state.data = {
                ...state.data,
                ...action.payload
            }
        },
        setDataUpdateFlag: (state, action) => {
            state.dataNeedToBeSaved = action.payload;
        },
        clearAuction: (state) => {
            state.data.auction = initialState.data.auction;
        },
        clearOffer: (state) => {
            state.data.offer = initialState.data.offer;
        }
    }
});

export const { clearAuction,clearOffer,setDraftData,setDataUpdateFlag, updateAndValidateFieldHandler, setErrors, clearListing, clearAllErrors } = listingSlice.actions;

export default listingSlice.reducer;

