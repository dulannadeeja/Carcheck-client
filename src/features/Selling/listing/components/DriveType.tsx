import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { updateAndValidateFieldHandler } from "../listingSlice";
import { IoChevronDownOutline } from "react-icons/io5";
import { useGetSpecsQuery } from "../listingApiSlice";

function DriveType() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { driveType } = data;
  const { data: driveTypeData, isSuccess } = useGetSpecsQuery("driveType");

  const handleChange = (value: string) => {
    dispatch(updateAndValidateFieldHandler({ field: "driveType", value }));
    setShowDropdown(false);
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Drive Type</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{driveType || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto z-[50] ">
            {driveTypeData &&
              isSuccess &&
              driveTypeData.map((type) => (
                <p
                  key={type._id}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                  onClick={() => handleChange(type.name)}
                >
                  {type.name}
                </p>
              ))}
          </div>
        )}
      </div>
      {errors.driveType && (
        <p className="text-red-300 text-sm col-span-12">
          {errors["driveType"]}
        </p>
      )}
    </div>
  );
}

export default DriveType;
