import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterOptions, setIsNeedToUpdateURL } from "../../clientListingSlice";
import { ListingFilterOptions } from "../../clientListing";

type Props = {
    filterOptions: ListingFilterOptions;
    categoryKey: keyof ListingFilterOptions; // Key to identify the filter category
}

function useMultiSelection({ filterOptions, categoryKey }: Props) {
    const dispatch = useDispatch();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        const categoryValues = filterOptions[categoryKey] as string;
        if (categoryValues) {
            setSelectedItems(categoryValues.split(","));
        } else {
            setSelectedItems([]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterOptions[categoryKey]]);

    useEffect(() => {
        // Dispatch Redux action to update the URL when filter options change
        dispatch(setIsNeedToUpdateURL(true));

        // Only update Redux state if there are actual changes to prevent loops
        if (filterOptions[categoryKey] !== selectedItems.join(",")) {
            dispatch(setFilterOptions({
                ...filterOptions,
                [categoryKey]: selectedItems.join(","),
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItems]); // Dependency only on selectedItems to avoid loop

    const onItemSelect = (itemName: string) => {
        setSelectedItems(prevItems =>
            prevItems.includes(itemName)
                ? prevItems.filter(item => item !== itemName)
                : [...prevItems, itemName]
        );
    };

    return {
        selectedItems,
        onItemSelect
    };
}

export default useMultiSelection;
