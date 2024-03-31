import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const makes = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "Nissan",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Hyundai",
  "Kia",
  "Volkswagen",
  "Subaru",
  "Lexus",
  "Jeep",
  "Mazda",
  "Tesla",
  "Volvo",
  "Porsche",
  "Ram",
  "Buick",
  "Cadillac",
  "GMC",
  "Chrysler",
  "Land Rover",
  "Acura",
  "Lincoln",
  "Infiniti",
  "Mini",
  "Mitsubishi",
  "Jaguar",
  "Bentley",
  "Ferrari",
  "Maserati",
  "Genesis",
  "Alfa Romeo",
  "Smart",
  "McLaren",
  "Lamborghini",
  "Rolls-Royce",
  "Aston Martin",
  "Bugatti",
  "Koenigsegg",
  "Maybach",
  "Polestar",
  "Lotus",
  "Rivian",
  "Lucid",
  "Karma",
  "Rivian",
];

function Make() {
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Make</p>
      <div
        className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>{selectedMake || ""}</p>
        <IoChevronDownOutline className="text-base" />
        {showDropdown && (
          <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
            {makes.map((make) => (
              <p
                key={make}
                className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                onClick={() => {
                  setSelectedMake(make);
                  setShowDropdown(false);
                }}
              >
                {make}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Make;
