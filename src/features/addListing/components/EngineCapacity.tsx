import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const capacityOptions = [
  "1.0L",
  "1.2L",
  "1.4L",
  "1.6L",
  "1.8L",
  "2.0L",
  "2.2L",
  "2.4L",
  "2.6L",
  "2.8L",
  "3.0L",
  "3.5L",
  "4.0L",
  "4.5L",
  "5.0L",
  "5.5L",
  "6.0L",
  "6.5L",
  "7.0L",
  "7.5L",
  "8.0L",
  "8.5L",
  "9.0L",
  "9.5L",
  "10.0L",
];

function EngineCapacity() {
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Engine Capacity</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{selectedCapacity}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {capacityOptions.map((capacity) => (
              <p
                key={capacity}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  setSelectedCapacity(capacity);
                }}
              >
                {capacity}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EngineCapacity;
