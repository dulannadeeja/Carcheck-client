import { useState } from "react";

const shippingOptions = [
  "Standard Shipping",
  "Express Shipping",
  "Priority Shipping",
];

function Shipping() {
  const [selectedOption, setSelectedOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <div className="mt-6">
      <p className="text-sm font-medium">Shipping Options:</p>
      <div className="relative">
        <div
          className="border border-gray-300 rounded-md p-2 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedOption || "Select Shipping Option"}
        </div>
        {showDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {shippingOptions.map((option) => (
              <div
                key={option}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shipping;
