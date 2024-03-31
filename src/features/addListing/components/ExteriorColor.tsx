import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const exteriorColors = [
  "Black",
  "White",
  "Silver",
  "Gray",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Purple",
  "Brown",
  "Gold",
];

function ExteriorColor() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Exterior Color</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{selectedColor || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {exteriorColors.map((color) => (
              <p
                key={color}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  setSelectedColor(color);
                  setShowDropdown(false);
                }}
              >
                {color}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExteriorColor;
