import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { useGetBrandsQuery } from "../../../../api/clientApiSlice";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setAdvancedSearchOptions } from "../advancedSearchSlice";

function BrandSelection() {
 const dispatch = useDispatch();
  const { advancedSearchOptions} = useSelector((state:RootState) => state.advancedSearch);
  const { data: brandData, isSuccess } = useGetBrandsQuery();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleChange = (make: string) => {
    dispatch(setAdvancedSearchOptions({
      ...advancedSearchOptions,
      make,
      model: "",
    }))
  };

  return (
    <div className="">
      <div
        className="relative flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{advancedSearchOptions.make || "Select Brand"}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white z-[50] absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {brandData &&
              isSuccess &&
              brandData.map((make) => (
                <p
                  key={make._id}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                  onClick={() => {
                    console.log(make.name);
                    handleChange(make.name);
                    setShowDropdown(false);
                  }}
                >
                  {make.name}
                </p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandSelection;