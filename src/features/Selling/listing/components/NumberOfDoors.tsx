import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";
import { numberOfDoorsOptions } from "../../../listing/listing";

function NumberOfDoors() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { numberOfDoors } = data;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleChange = (value: number) => {
    dispatch(updateFieldHandler({ field: "numberOfDoors", value }));
    dispatch(validateFieldHandler({ field: "numberOfDoors", value }));
    setShowDropdown(false);
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Number of Doors</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{numberOfDoors || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto z-[10]">
            {numberOfDoorsOptions.map((option) => (
              <p
                key={option.name}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => handleChange(parseInt(option.name, 10))}
              >
                {option.name}
              </p>
            ))}
          </div>
        )}
      </div>
      {errors.numberOfDoors && (
        <p className="text-red-500 text-sm col-span-12">
          {errors["numberOfDoors"]}
        </p>
      )}
    </div>
  );
}

export default NumberOfDoors;
