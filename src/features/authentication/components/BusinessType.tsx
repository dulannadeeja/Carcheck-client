import React from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { BusinessType as TypesOfBusinesses } from "../auth";

const BusinessTypeOptions = [
  {
    name: "Spare Parts Business",
    value: TypesOfBusinesses.SpareParts,
  },
  {
    name: "Car Dealership",
    value: TypesOfBusinesses.VehicleDealership,
  },
  {
    name: "Automobile Service Point",
    value: TypesOfBusinesses.AutomotiveService,
  },
];

function BusinessType({
  selectedType,
  setSelectedType,
}: {
  selectedType: TypesOfBusinesses;
  setSelectedType: React.Dispatch<React.SetStateAction<TypesOfBusinesses>>;
}) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  return (
    <div className="flex flex-1 flex-col gap-1 mb-3">
      <div
        className="relative flex justify-between items-center border border-gray-200 py-[0.45rem] px-3 rounded-md bg-gray-50"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p className="text-gray-300">{selectedType}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {BusinessTypeOptions.map((type) => (
              <p
                key={type.value}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  setSelectedType(type.value);
                  setShowDropdown(false);
                }}
              >
                {type.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessType;
