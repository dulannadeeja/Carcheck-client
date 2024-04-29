import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { updateAndValidateFieldHandler} from "../listingSlice";
import { useGetSpecsQuery } from "../listingApiSlice";

function InteriorColor() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { interiorColor } = data;
  const { data: interiorColorData, isSuccess } =
    useGetSpecsQuery("colorOptions");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleChange = (value: string) => {
    dispatch(updateAndValidateFieldHandler({ field: "interiorColor", value }));
    setShowDropdown(false);
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Interior Color</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{interiorColor || ""}</p>{" "}
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white z-[50] absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {interiorColorData &&
              isSuccess &&
              interiorColorData.map((color) => (
                <p
                  key={color._id}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                  onClick={() => {
                    handleChange(color.name);
                  }}
                >
                  {color.name}
                </p>
              ))}
          </div>
        )}
      </div>
      {errors.interiorColor && (
        <p className="text-red-300 text-sm col-span-12">
          {errors["interiorColor"]}
        </p>
      )}
    </div>
  );
}

export default InteriorColor;
