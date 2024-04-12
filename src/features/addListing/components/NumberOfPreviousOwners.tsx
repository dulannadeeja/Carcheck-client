import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";
import { RootState } from "../../../store/store";
import { numberOfPreviousOwnersOptions } from "../../listing/listing";

function NumberOfPreviousOwners() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { numberOfPreviousOwners } = data;

  const handleChange = (value: number) => {
    dispatch(updateFieldHandler({ field: "numberOfPreviousOwners", value }));
    dispatch(validateFieldHandler({ field: "numberOfPreviousOwners", value }));
    setShowDropdown(false);
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">
        Number of Previous Owners
      </p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{numberOfPreviousOwners < 0 ? "" : numberOfPreviousOwners}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {numberOfPreviousOwnersOptions.map((option) => (
              <p
                key={option.name}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => handleChange(option.value)}
              >
                {option.name}
              </p>
            ))}
          </div>
        )}
      </div>
      {errors.numberOfPreviousOwners && (
        <p className="text-red-300 text-sm col-span-12">
          {errors["numberOfPreviousOwners"]}
        </p>
      )}
    </div>
  );
}

export default NumberOfPreviousOwners;
