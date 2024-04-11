import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";
import { vehicleMakeArray } from "../listing";

function Make() {
  const dispatch = useDispatch();
  const { data,errors } = useSelector((state: RootState) => state.listing);
  const { make } = data;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Make</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{make || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {vehicleMakeArray.map((make) => (
              <p
                key={make}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  dispatch(updateFieldHandler({ field: "make", value: make }));
                  dispatch(validateFieldHandler({ field: "make", value: make }));
                  setShowDropdown(false);
                }}
              >
                {make}
              </p>
            ))}
          </div>
        )}
      </div>
      {errors.make && (
          <p className="text-red-300 text-sm col-span-12">{errors["make"]}</p>
        )}
    </div>
  );
}

export default Make;
