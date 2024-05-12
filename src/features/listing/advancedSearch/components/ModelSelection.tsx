import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { Vehicle } from "../../../listing/clientListing";
import { useGetVehicleModelsByMakeQuery } from "../../../../api/clientApiSlice";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setAdvancedSearchOptions } from "../advancedSearchSlice";

function ModelSelection() {
  const dispatch = useDispatch();
  const { advancedSearchOptions} = useSelector((state:RootState) => state.advancedSearch);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const { data, isLoading, isSuccess } = useGetVehicleModelsByMakeQuery({
    make: advancedSearchOptions.make
  });

  const handleChange = (model: string) => {
    dispatch(setAdvancedSearchOptions({
      ...advancedSearchOptions,
      model,
    }))
  };

  return (
    <div className="">
      <div
        className="relative flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{advancedSearchOptions.model || "Select model"}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto z-[100]">
            {!data && isSuccess && (
              <p className="text-gray-300 p-4 text-sm">
                No models found for the selected make. Please select another
                make.
              </p>
            )}
            {isLoading && (
              <p className="text-gray-300 p-4 text-sm">Loading...</p>
            )}
            {data &&
              data.data.map((model: Vehicle) => (
                <p
                  key={model.vehicleModel}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                  onClick={() => {
                    handleChange(model.vehicleModel);
                    setShowDropdown(false);
                  }}
                >
                  {model.vehicleModel}
                </p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModelSelection;
