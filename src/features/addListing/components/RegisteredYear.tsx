import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const START_YEAR = 1900;
const CURRENT_YEAR = new Date().getFullYear();

const years = Array.from(
  { length: CURRENT_YEAR - START_YEAR + 1 },
  (_, index) => CURRENT_YEAR - index
);

function RegisteredYear() {
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Registered year</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{selectedYear === 0 ? "" : selectedYear}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {years.map((year) => (
              <p
                key={year}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  setSelectedYear(year);
                }}
              >
                {year}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisteredYear;
