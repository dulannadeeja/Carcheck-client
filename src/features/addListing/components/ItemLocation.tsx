import { useCallback, useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";

import {
  divisionsOfSrilanka,
  getCitiesOfDivision,
  TCitiesOfDivision,
  TDivision,
} from "../../locationFilter/location";

function ItemLocation() {
  const dispatch = useDispatch();
  const [citiesOfDivision, setCitiesOfDivision] = useState<TCitiesOfDivision>(
    []
  );
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { location } = data;
  const { division, city, zipCode } = location;
  const [showDivisionDropdown, setShowDivisionDropdown] =
    useState<boolean>(false);
  const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);

  const clearCityFromState = useCallback(() => {
    dispatch(validateFieldHandler({ field: "location.city", value: "" }));
    dispatch(updateFieldHandler({ field: "location.city", value: "" }));
  }, [dispatch]);

  const clearZipCodeFromState = useCallback(() => {
    dispatch(validateFieldHandler({ field: "location.zipCode", value: "" }));
    dispatch(updateFieldHandler({ field: "location.zipCode", value: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (division !== "") {
      const cities = getCitiesOfDivision(division as TDivision);
      setCitiesOfDivision(cities as unknown as TCitiesOfDivision);
    } else {
      setCitiesOfDivision([]);
    }
    clearCityFromState();
    clearZipCodeFromState();
  }, [division, clearCityFromState, clearZipCodeFromState]);

  const handleDivisionChange = (value: string) => {
    dispatch(updateFieldHandler({ field: "location.division", value }));
    dispatch(validateFieldHandler({ field: "location.division", value }));
    setShowDivisionDropdown(false);
    if (division !== "") {
      clearCityFromState();
      clearZipCodeFromState();
      const cities = getCitiesOfDivision(division as TDivision);
      setCitiesOfDivision(cities as unknown as TCitiesOfDivision);
      citiesOfDivision.forEach((city) => {
        console.log(city.city);
      });
    }
  };

  const handleCityChange = ({
    city,
    zipCode,
  }: {
    city: string;
    zipCode: string;
  }) => {
    dispatch(updateFieldHandler({ field: "location.city", value: city }));
    dispatch(validateFieldHandler({ field: "location.city", value: city }));
    setShowCityDropdown(false);

    // set zip code
    dispatch(updateFieldHandler({ field: "location.zipCode", value: zipCode }));
    dispatch(
      validateFieldHandler({ field: "location.zipCode", value: zipCode })
    );
  };

  return (
    <div className="flex gap-10">
      {/* division */}
      <div className="flex-1 flex gap-2 flex-col">
        <p className="text-sm font-medium">Division</p>
        <div
          className="relative flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
          onClick={() => {
            setShowDivisionDropdown(!showDivisionDropdown);
            setShowCityDropdown(false);
          }}
        >
          <p>{location.division || ""}</p>
          <IoChevronDownOutline className="text-base" />
          {showDivisionDropdown && (
            <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
              {divisionsOfSrilanka.map((division) => (
                <p
                  key={division}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                  onClick={() => {
                    handleDivisionChange(division);
                  }}
                >
                  {division}
                </p>
              ))}
            </div>
          )}
        </div>
        {errors.location.division && (
          <p className="text-red-300 text-sm">
            {errors["location"]["division"]}
          </p>
        )}
      </div>

      {/* city */}
      <div className="flex-1 flex gap-2 flex-col">
        <p className="text-sm font-medium ">City</p>
        <div
          className="relative flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
          onClick={() => {
            setShowDivisionDropdown(false);
            setShowCityDropdown(!showCityDropdown);
          }}
        >
          <p>{city || ""}</p>
          <IoChevronDownOutline className="text-base" />
          {showCityDropdown && (
            <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
              {citiesOfDivision.map((city) => (
                <p
                  key={city.city}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                  onClick={() => {
                    handleCityChange({
                      city: city.city,
                      zipCode: city.code,
                    });
                  }}
                >
                  {city.city}
                </p>
              ))}
            </div>
          )}
        </div>
        {errors.location.city && (
          <p className="text-red-300 text-sm">
            {errors["location"]["city"]}
          </p>
        )}
      </div>

      {/* zip code */}
      <div className="flex-1 flex gap-2 flex-col">
        <p className="text-sm font-medium ">Zip</p>
        <div className="relative  flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 pointer-events-none h-10">
          <p>{zipCode || ""}</p>
        </div>
        {errors.location.zipCode && (
          <p className="text-red-300 text-sm">
            {errors["location"]["zipCode"]}
          </p>
        )}
      </div>
    </div>
  );
}

export default ItemLocation;
