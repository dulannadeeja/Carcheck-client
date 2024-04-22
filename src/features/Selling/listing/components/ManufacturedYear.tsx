import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";

const START_YEAR = 1989;
const CURRENT_YEAR = new Date().getFullYear();

const years = Array.from(
  { length: CURRENT_YEAR - START_YEAR + 1 },
  (_, index) => CURRENT_YEAR - index
);

function ManufacturedYear() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { manufacturedYear } = data;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Manufactured year</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10 "
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{manufacturedYear === 0 ? "" : manufacturedYear}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto z-[50]">
            {years.map((year) => (
              <p
                key={year}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  dispatch(
                    updateFieldHandler({
                      field: "manufacturedYear",
                      value: year,
                    })
                  );
                  dispatch(
                    validateFieldHandler({
                      field: "manufacturedYear",
                      value: year,
                    })
                  );
                }}
              >
                {year}
              </p>
            ))}
          </div>
        )}
      </div>
      {errors.manufacturedYear && (
        <p className="text-red-300 text-sm col-span-12">
          {errors["manufacturedYear"]}
        </p>
      )}
    </div>
  );
}

export default ManufacturedYear;
