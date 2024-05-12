
import { useState } from "react";
import { Conditions } from "../../clientListing";

export type AdvancedSearchOptions = {
    selectedBrand: string;
    selectedModel: string;
    minYear: number;
    maxYear: number;
    minPrice: number;
    maxPrice: number;
    condition: string;
    category: string;
    division: string;
    city: string;
    minMileage: number;
    MaxMileage: number;
}

export type AdvancedSearchErrors = {
    selectedBrand: string;
    selectedModel: string;
    minYear: string;
    maxYear: string;
    minPrice: string;
    maxPrice: string;
    condition: string;
    category: string;
    division: string;
    city: string;
    minMileage: string;
    MaxMileage: string;
}

function useAdvancedSearch() {
    const [errors, setErrors] = useState<AdvancedSearchErrors>({
        selectedBrand: "",
        selectedModel: "",
        minYear: "",
        maxYear: "",
        minPrice: "",
        maxPrice: "",
        condition: "",
        category: "",
        division: "",
        city: "",
        minMileage: "",
        MaxMileage: ""
    });
    const [options, setOptions] = useState<AdvancedSearchOptions>({
        selectedBrand: "",
        selectedModel: "",
        minYear: 0,
        maxYear: 0,
        minPrice: 0,
        maxPrice: 0,
        condition: "",
        category: "",
        division: "",
        city: "",
        minMileage: 0,
        MaxMileage: 0
    });

    const handleBrandChange = (brand: string) => {
        console.log(brand);
        setOptions({ ...options, selectedBrand: brand, selectedModel: "" });
        console.log(options);
    }

    const handleModelChange = (model: string) => {
        setOptions({ ...options, selectedModel: model });
    }

    const handleMinYearChange = (year: number) => {
        setOptions({ ...options, minYear: year, maxYear: 0 });
    }

    const handleMaxYearChange = (year: number) => {
        if (year < options.minYear) {
            console.log("Max year should be greater than min year");
            setErrors({ ...errors, maxYear: "Max year should be greater than min year" });
        } else {
            console.log("Max year correct");
            setErrors({
                ...errors, maxYear: ""
            })
        }
        setOptions({ ...options, maxYear: year });
    }

    const handleMinPriceChange = (price: number) => {
        setOptions({ ...options, minPrice: price });
        setOptions({ ...options, maxPrice: 0 });
    }

    const handleMaxPriceChange = (price: number) => {
        if (price < options.minPrice) {
            setErrors({ ...errors, maxPrice: "Max price should be greater than min price" });
        } else {
            setErrors({ ...errors, maxPrice: "" });
        }
        setOptions({ ...options, maxPrice: price });
    }

    const handleConditionChange = (condition: string) => {
        if(condition === Conditions.brandNew){
            setOptions({...options, minMileage: 0, MaxMileage: 0})
        }
        setOptions({ ...options, condition: condition });
    }

    const handleCategoryChange = (category: string) => {
        setOptions({ ...options, category: category });
    }

    const handleDivisionChange = (division: string) => {
        setOptions({ ...options, division: division, city: ""});
    }

    const handleCityChange = (city: string) => {
        setOptions({ ...options, city: city });
    }

    const handleMinMileageChange = (mileage: number) => {
        setOptions({ ...options, minMileage: mileage, MaxMileage: 0 });
    }

    const handleMaxMileageChange = (mileage: number) => {
        if (mileage < options.minMileage) {
            setErrors({ ...errors, MaxMileage: "Max mileage should be greater than min mileage" });
        } else {
            setErrors({ ...errors, MaxMileage: "" });
        }
        setOptions({ ...options, MaxMileage: mileage });
    }

    return {
        errors,
        options,
        handleBrandChange,
        handleModelChange,
        handleMinYearChange,
        handleMaxYearChange,
        handleMinPriceChange,
        handleMaxPriceChange,
        handleConditionChange,
        handleCategoryChange,
        handleDivisionChange,
        handleCityChange,
        handleMinMileageChange,
        handleMaxMileageChange
    }
}

export default useAdvancedSearch;