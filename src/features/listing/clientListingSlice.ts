import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetListingType, ListingFilterOptions } from "./clientListing";


const initialState: {
    filterOptions: ListingFilterOptions,
    listings: GetListingType[]
    isNeedToUpdateURL: boolean,
    totalListings: number
} = {
    filterOptions: {
        limit: 50,
        page: 1,
        search: "",
        sortBy: "",
        condition: "",
        make: "",
        model: "",
        mileageMax: "",
        mileageMin: "",
        yearMax: "",
        yearMin: "",
        transmission: "",
        fuelType: "",
        driveType: "",
        listingType: "",
        priceMax: "",
        priceMin: "",
        bodyType: "",
        soldBy: "",
        city: "",
        division: ""
    },
    listings: [],
    totalListings: 0,
    isNeedToUpdateURL: false
}

export const clientListingSlice = createSlice({
    name: "clientListing",
    initialState,
    reducers: {
        setFilterOptions: (state, action: PayloadAction<ListingFilterOptions>) => {
            state.filterOptions = action.payload;
        },
        setListings: (state, action: PayloadAction<GetListingType[]>) => {
            state.listings = action.payload;
        },
        setIsNeedToUpdateURL: (state, action: PayloadAction<boolean>) => {
            state.isNeedToUpdateURL = action.payload;
        },
        resetFilterOptions: (state) => {
            state.filterOptions = initialState.filterOptions;
        },
        setTotalListings: (state, action: PayloadAction<number>) => {
            state.totalListings = action.payload;
        }
    }
});

export const { setFilterOptions,setListings,setIsNeedToUpdateURL,resetFilterOptions,setTotalListings } = clientListingSlice.actions;

export default clientListingSlice.reducer;