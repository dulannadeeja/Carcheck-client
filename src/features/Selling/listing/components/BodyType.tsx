import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";
import { useGetSpecsQuery } from "../listingApiSlice";

function BodyType() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { bodyType } = data;
  const { data: bodyTypeData, isSuccess } = useGetSpecsQuery("categories");

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleChange = (value: string) => {
    dispatch(updateFieldHandler({ field: "bodyType", value }));
    dispatch(validateFieldHandler({ field: "bodyType", value }));
    setShowDropdown(false);
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Body Type</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{bodyType || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col z-[50] bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {bodyTypeData &&
              isSuccess &&
              bodyTypeData.map((bodyType) => (
                <p
                  key={bodyType._id}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                  onClick={() => {
                    handleChange(bodyType.name);
                  }}
                >
                  {bodyType.name}
                </p>
              ))}
          </div>
        )}
      </div>
      {errors.bodyType && (
        <p className="text-red-300 text-sm col-span-12">{errors["bodyType"]}</p>
      )}
    </div>
  );
}

export default BodyType;
