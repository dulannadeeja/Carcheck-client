import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";
import { transmissionArray } from "../listing";

function Transmission() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { transmission } = data;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleChange = (value: string) => {
    dispatch(updateFieldHandler({ field: "transmission", value }));
    dispatch(validateFieldHandler({ field: "transmission", value }));
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Transmission</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{transmission || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col z-10 bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {transmissionArray.map((transmission) => (
              <p
                key={transmission}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  handleChange(transmission);
                }}
              >
                {transmission}
              </p>
            ))}
          </div>
        )}
      </div>
      {errors.transmission && (
        <p className="text-red-300 text-sm col-span-12">
          {errors["transmission"]}
        </p>
      )}
    </div>
  );
}

export default Transmission;
