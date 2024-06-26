import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { updateAndValidateFieldHandler } from "../listingSlice";
import { useGetSpecsQuery } from "../listingApiSlice";

function FuelType() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { fuelType } = data;
  const { data: fuelTypeData, isSuccess } = useGetSpecsQuery("fuelType");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleChange = (value: string) => {
    dispatch(updateAndValidateFieldHandler({ field: "fuelType", value }));
    setShowDropdown(false);
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Fuel Type</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{fuelType || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white z-[50] absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {fuelTypeData &&
              isSuccess &&
              fuelTypeData.map((fuelType) => (
                <p
                  key={fuelType._id}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                  onClick={() => {
                    handleChange(fuelType.name);
                  }}
                >
                  {fuelType.name}
                </p>
              ))}
          </div>
        )}
      </div>
      {errors.fuelType && (
        <p className="text-red-300 text-sm col-span-12">{errors["fuelType"]}</p>
      )}
    </div>
  );
}

export default FuelType;
