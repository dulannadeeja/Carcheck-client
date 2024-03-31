import React, { useState } from "react";
import Input from "../../../components/ui/Input";

function Mileage() {
  const [mileage, setMileage] = useState("");

  const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMileage(e.target.value);
  };
  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Mileage</p>
      <Input
        placeholder="Enter your own mileage"
        className="border-gray-200 bg-gray-100 col-span-7"
        onChange={handleMileageChange}
        type="number"
        value={mileage}
      />
    </div>
  );
}

export default Mileage;
