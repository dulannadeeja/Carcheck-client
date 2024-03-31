import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const ownerOptions = ["0", "1", "2", "3", "4", "5 or more"];

function NumberOfPreviousOwners() {
  const [selectedOwners, setSelectedOwners] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">
        Number of Previous Owners
      </p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{selectedOwners || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {ownerOptions.map((option) => (
              <p
                key={option}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  setSelectedOwners(option);
                  setShowDropdown(false);
                }}
              >
                {option}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NumberOfPreviousOwners;
