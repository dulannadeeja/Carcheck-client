import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { numberOfSeatsOptions } from "../../../listing/clientListing";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";

function NumberOfSeats() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { numberOfSeats } = data;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleChange = (value: number) => {
    dispatch(updateFieldHandler({ field: "numberOfSeats", value }));
    dispatch(validateFieldHandler({ field: "numberOfSeats", value }));
    setShowDropdown(false);
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Number of Seats</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{numberOfSeats}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto z-[50]">
            {numberOfSeatsOptions.map((option) => (
              <p
                key={option.name}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  handleChange(parseInt(option.value, 10));
                }}
              >
                {option.name}
              </p>
            ))}
          </div>
        )}
      </div>
      {errors.numberOfSeats && (
        <p className="text-red-300 text-sm col-span-12">
          {errors["numberOfSeats"]}
        </p>
      )}
    </div>
  );
}

export default NumberOfSeats;
