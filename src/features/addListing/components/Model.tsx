import { useCallback, useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useGetVehicleModelsQuery } from "../vehicleApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Vehicle } from "../../listing/listing";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";

function Model() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const dispatch = useDispatch();
  const listingState = useSelector((state: RootState) => state.listing);
  const listingData = listingState.data;
  const { errors } = listingState;
  const { vehicleModel, make } = listingData;

  // Destructuring to directly use `make` as the argument for the query hook.
  const { data, isLoading } = useGetVehicleModelsQuery(make);

  const handleModelChange = useCallback(
    (value: string) => {
      dispatch(updateFieldHandler({ field: "vehicleModel", value }));
      dispatch(validateFieldHandler({ field: "vehicleModel", value }));
      setShowDropdown(false);
    },
    [dispatch]
  );

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Model</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{vehicleModel}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {!data && !isLoading && (
              <p className="text-gray-300 p-4 text-sm">
                No models found for the selected make. Please select another
                make.
              </p>
            )}
            {!data && isLoading && (
              <p className="text-gray-300 p-4 text-sm">Loading...</p>
            )}
            {data &&
              data.map((model: Vehicle) => (
                <p
                  key={model.vehicleModel}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                  onClick={() => {
                    handleModelChange(model.vehicleModel);
                    setShowDropdown(false);
                  }}
                >
                  {model.vehicleModel}
                </p>
              ))}
          </div>
        )}
      </div>
      {errors.vehicleModel && (
        <p className="text-red-300 text-sm col-span-12">
          {errors["vehicleModel"]}
        </p>
      )}
    </div>
  );
}

export default Model;
