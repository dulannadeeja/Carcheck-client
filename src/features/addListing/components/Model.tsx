import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

// This is a placeholder array for demonstration purposes.
const models = [
  "Corolla",
  "Civic",
  "F-150",
  "Silverado",
  "Altima",
  "3 Series",
  "C-Class",
  "A4",
  "Elantra",
  "Sorento",
  "Golf",
  "Outback",
  "RX",
  "Wrangler",
  "CX-5",
  "Model 3",
  "XC90",
  "911",
  "RAM 1500",
  "Enclave",
  "Escalade",
  "Sierra 1500",
  "Pacifica",
  "Range Rover",
  "MDX",
  "Navigator",
  "QX60",
  "Countryman",
  "Outlander",
  "F-PACE",
  "Continental GT",
  "488 GTB",
  "GranTurismo",
  "G70",
  "Stinger",
  "570S",
  "Huracan",
  "Phantom",
  "DB11",
  "Chiron",
  "Agera RS",
  "S-Class",
  "S60",
  "Air",
  "Lucid",
  "Revero",
  "Model S",
];

function Model() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Model</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{selectedModel || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {models.map((model) => (
              <p
                key={model}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  setSelectedModel(model);
                  setShowDropdown(false);
                }}
              >
                {model}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Model;
