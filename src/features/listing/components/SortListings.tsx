import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { IoChevronDownOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setFilterOptions, setIsNeedToUpdateURL } from "../clientListingSlice";
import { cn } from "../../../utils/mergeClasses";
import { sortOptions } from "../clientListing";

function SortListings() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { filterOptions } = useSelector(
    (state: RootState) => state.clientListing
  );
  const [sortBy, setSortBy] = useState(filterOptions.sortBy);

  // set open to false when clicked outside the sortListing
  document.addEventListener("click", (e) => {
    const sortListing = document.getElementById("sortListing");
    if (sortListing && !sortListing.contains(e.target as Node)) {
      setOpen(false);
    }
  });

  const onChange = (option: string) => {
    setOpen(false);
    setSortBy(option);
  };

  useEffect(() => {
    if(sortBy !== filterOptions.sortBy){
      dispatch(setIsNeedToUpdateURL(true));
    dispatch(setFilterOptions({ ...filterOptions, sortBy}));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch, sortBy]);

  return (
    <div className="flex relative" id="sortListing">
      <Button
        intent="iconText"
        size="none"
        className="text-gray-600 px-5 py-1 rounded-full hover:bg-gray-150 bg-gray-100 border border-gray-200 border-solid"
        onClick={() => setOpen(!open)}
      >
        <span>{filterOptions.sortBy || "Sort: best match"}</span>
        <IoChevronDownOutline />
      </Button>
      <article
        className={`absolute top-10 left-0 min-w-60 bg-white border border-gray-200 border-solid rounded-lg shadow-lg ${
          open ? "" : "hidden"
        }`}
      >
        <ul className="flex gap-3 flex-col px-4 py-3">
          {sortOptions.map((option) => (
            <li
              key={option.value}
              className={cn(
                "flex gap-5 items-center justify-between cursor-pointer",
                {
                  "font-medium text-blue-500": filterOptions.sortBy === option.value,
                }
              )}
              onClick={() => onChange(option.value)}
            >
              <p>
                {option.title}
              </p>
              {filterOptions.sortBy === option.value && <GiCheckMark />}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export default SortListings;
