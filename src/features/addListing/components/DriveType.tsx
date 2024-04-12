import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";
import { IoChevronDownOutline } from "react-icons/io5";
import { driveTypesArray } from "../../listing/listing";

function DriveType() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { driveType } = data;
  const handleChange = (value: string) => {
    dispatch(updateFieldHandler({ field: "driveType", value }));
    dispatch(validateFieldHandler({ field: "driveType", value }));
    setShowDropdown(false);
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Drive Type</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{driveType || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {driveTypesArray.map((type) => (
              <p
                key={type}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => handleChange(type)}
              >
                {type}
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
