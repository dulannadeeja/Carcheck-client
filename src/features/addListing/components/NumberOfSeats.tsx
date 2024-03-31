import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const seatOptions = ["2", "4", "5", "7", "8", "9", "More than 9"];

function NumberOfSeats() {
  const [selectedSeats, setSelectedSeats] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Number of Seats</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{selectedSeats || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {seatOptions.map((option) => (
              <p
                key={option}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  setSelectedSeats(option);
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

export default NumberOfSeats;
