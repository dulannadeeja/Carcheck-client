import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const bodyTypes = [
  "Sedan",
  "SUV",
  "Truck",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Van",
  "Wagon",
];

function BodyType() {
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Body Type</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{selectedBodyType || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col z-10 bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {bodyTypes.map((bodyType) => (
              <p
                key={bodyType}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  setSelectedBodyType(bodyType);
                  setShowDropdown(false);
                }}
              >
                {bodyType}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BodyType;
