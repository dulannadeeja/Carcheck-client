import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AdvancedSearchOptions = {
    conditions: string[],
    make: string,
    model: string,
    mileageMax: number,
    mileageMin: number,
    yearMax: number,
    yearMin: number,
    priceMax: number,
    priceMin: number,
    categories: string[],
}

export type AdvancedSearchErrors = {
    mileageMax: string,
    mileageMin: string,
    yearMax: string,
    yearMin: string,
    priceMax: string,
    priceMin: string,
}

const initialState: {
    advancedSearchOptions: AdvancedSearchOptions,
    errors: AdvancedSearchErrors
} = {
    advancedSearchOptions: {
        conditions: [],
        make: "",
        model: "",
        mileageMax: 0,
        mileageMin: 0,
        yearMax: 0,
        yearMin: 0,
        priceMax: 0,
        priceMin: 0,
        categories: []
    },
    errors : {
        mileageMax: "",
        mileageMin: "",
        yearMax: "",
        yearMin: "",
        priceMax: "",
        priceMin: "",
    }
}

const validateMinMax = (min: number, max: number, key: string): string => {
    return max !== 0 && min > max ? `Looks like values are not in order for ${key}.` : "";
}

const rangeSetter = (state: typeof initialState, min: number, max: number, key: string) => {
    state.advancedSearchOptions[`${key}Min`] = min;
    state.advancedSearchOptions[`${key}Max`] = max;
    state.errors[`${key}Max`] = validateMinMax(min, max, key);
}

export const advancedSearchSlice = createSlice({
    name: "advancedSearch",
    initialState,
    reducers: {
        setAdvancedSearchOptions: (state, action: PayloadAction<AdvancedSearchOptions>) => {
            state.advancedSearchOptions = action.payload;
        },
        setErrors: (state, action: PayloadAction<AdvancedSearchErrors>) => {
            state.errors = action.payload;
        },
        validateAdvancedSearch: (state) => {
            Object.keys(state.errors).forEach((key) => {
                if (key.endsWith("Max")) {
                    const minKey = key.replace("Max", "Min");
                    state.errors[key] = validateMinMax(state.advancedSearchOptions[minKey], state.advancedSearchOptions[key], key);
                }
            });
        },
        setRange: (state, action: PayloadAction<{ key: string, min: number, max: number }>) => {
            rangeSetter(state, action.payload.min, action.payload.max, action.payload.key);
        },
    }
});

export const { setRange, setAdvancedSearchOptions, setErrors, validateAdvancedSearch } = advancedSearchSlice.actions;
export default advancedSearchSlice.reducer;
