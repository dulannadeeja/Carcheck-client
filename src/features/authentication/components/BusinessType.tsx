import React from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const BusinessTypeOptions = [
  "Spare Parts Business",
  "Car Dealership",
  "Automobile Service Point",
];

function BusinessType() {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState(
    "What is your business?"
  );
  return (
    <div className="flex flex-1 flex-col gap-1 mb-3">
      <div
        className="relative flex justify-between items-center border border-gray-200 py-[0.45rem] px-3 rounded-md bg-gray-50"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p
          className={`${
            selectedType === "What is your business?"
              ? "text-gray-300"
              : "text-black"
          }`}
        >
          {selectedType}
        </p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {BusinessTypeOptions.map((type) => (
              <p
                key={type}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  setSelectedType(type);
                  setShowDropdown(false);
                }}
              >
                {type}
              </p>
            ))}
          </div>
        )}
      </div>
      <p className="text-red-300 text-sm">Please select the type of your business</p>
    </div>
  );
}

export default BusinessType;
