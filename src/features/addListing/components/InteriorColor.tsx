import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { colorOptions } from "../listing"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";

function InteriorColor() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { interiorColor } = data;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleChange = (value: string) => {
    dispatch(updateFieldHandler({ field: "interiorColor", value }));
    dispatch(validateFieldHandler({ field: "interiorColor", value }));
    setShowDropdown(false);
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Interior Color</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{interiorColor || ""}</p>{" "}
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {colorOptions.map((color) => (
              <p
                key={color}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  handleChange(color);
                }}
              >
                {color}
              </p>
            ))}
          </div>
        )}
      </div>
      {errors.interiorColor && (
        <p className="text-red-500 text-sm col-span-12">
          {errors["interiorColor"]}
        </p>
      )}
    </div>
  );
}

export default InteriorColor;
