import React from "react";
import Condition from "./Condition";
import Button from "../../../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { validateAdvancedSearch } from "../advancedSearchSlice";
import BrandSelection from "./BrandSelection";
import ModelSelection from "./ModelSelection";
import ManufacturedYear from "./ManufacturedYear";
import PriceFilter from "./Price";
import MileageFilter from "./mileage";
import Category from "./Category";

function AdvancedSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { advancedSearchOptions, errors } = useSelector(
    (state: RootState) => state.advancedSearch
  );

  const onSearch = () => {
    dispatch(validateAdvancedSearch());
    // check if there are any errors
    Object.keys(errors).forEach((key) => {
      if (errors[key] !== "") {
        return;
      }
    });
    // proceed with search
    const mergedCategories = advancedSearchOptions.categories.join(",");
    const mergedConditions = advancedSearchOptions.conditions.join(",");
    const yearMin =
      advancedSearchOptions.yearMin === 0 ? "" : advancedSearchOptions.yearMin;
    const yearMax =
      advancedSearchOptions.yearMax === 0 ? "" : advancedSearchOptions.yearMax;
    const priceMin =
      advancedSearchOptions.priceMin === 0
        ? ""
        : advancedSearchOptions.priceMin;
    const priceMax =
      advancedSearchOptions.priceMax === 0
        ? ""
        : advancedSearchOptions.priceMax;
    const mileageMin =
      advancedSearchOptions.mileageMin === 0
        ? ""
        : advancedSearchOptions.mileageMin;
    const mileageMax =
      advancedSearchOptions.mileageMax === 0
        ? ""
        : advancedSearchOptions.mileageMax;

    const searchQuery = `?make=${advancedSearchOptions.make}&model=${advancedSearchOptions.model}&yearMin=${yearMin}&yearMax=${yearMax}&priceMin=${priceMin}&priceMax=${priceMax}&mileageMin=${mileageMin}&mileageMax=${mileageMax}&bodyType=${mergedCategories}&condition=${mergedConditions}`;

    navigate(`/listings${searchQuery}`);
  };

  return (
    <div>
      <h3 className="text-xl font-medium mt-3 mb-3">Advanced Search</h3>
      <p className="text-gray-400 mb-5">
        Filter out the best fits for your needs from our vast collection of
        vehicles.
      </p>
      <div className="border p-10 rounded-lg flex flex-col">
        <div className="grid grid-cols-4 items-start gap-10 flex-1">
          <BrandSelection />
          <ModelSelection />
          <ManufacturedYear />
          <PriceFilter />
          <MileageFilter />
          <Condition />
          <Category />
          <div className="flex gap-5 items-center">
          <Button
            intent="primary"
            type="button"
            className="rounded-full px-10"
            onClick={onSearch}
          >
            Search
          </Button>
          <Link to="/listings" className="text-blue-300">
            View All Listings
          </Link>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default AdvancedSearch;
