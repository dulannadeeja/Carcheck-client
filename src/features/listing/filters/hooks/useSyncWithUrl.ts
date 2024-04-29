import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ListingFilterOptions } from "../../clientListing";
import { setFilterOptions } from "../../clientListingSlice";
import { RootState } from "../../../../store/store";


function useSyncWithUrl(filterOptions:ListingFilterOptions) {
    const {isNeedToUpdateURL} = useSelector((state:RootState) => state.clientListing);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    // get the filter options from the URL
  useEffect(() => {
    if(isNeedToUpdateURL) return;
    const searchParams = new URLSearchParams(location.search);

    const filterOptions: ListingFilterOptions = {
      search: "",
      sortBy: "",
      sortOrder: "",
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
      division: "",
    };

    Object.entries(filterOptions).forEach(([key]) => {
      const queryValue = searchParams.get(key);

      if (key in filterOptions && queryValue) {
        filterOptions[key as keyof ListingFilterOptions] = queryValue as never;
      }
    });
    dispatch(setFilterOptions(filterOptions));

  }, [dispatch, isNeedToUpdateURL, location.search]);

  useEffect(() => {
    if(!isNeedToUpdateURL) return;
    // Push changes to the URL
    const searchParams = new URLSearchParams();

    Object.entries(filterOptions).forEach(([key, value]) => {
      if (value) searchParams.set(key, value.toString());
    });

    // Update the URL without navigating
    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [filterOptions, isNeedToUpdateURL, navigate]);

  return [isNeedToUpdateURL]

}

export default useSyncWithUrl;

