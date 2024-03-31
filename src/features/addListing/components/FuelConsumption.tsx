import { ChangeEvent, useState } from "react";
import Input from "../../../components/ui/Input";

function FuelConsumption() {
  // State variables for max and min fuel consumption
  const [maxFuelConsumption, setMaxFuelConsumption] = useState<number>(0);
  const [minFuelConsumption, setMinFuelConsumption] = useState<number>(0);
  const [maxDisabled, setMaxDisabled] = useState(true);

  // Function to handle changes in max fuel consumption input
  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxFuelConsumption(event.target.value as unknown as number);
  };

  // Function to handle changes in min fuel consumption input
  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinFuelConsumption(event.target.value as unknown as number);
    // Enable max fuel consumption input when min fuel consumption is entered
    if ((event.target.value as unknown as number) > 0) {
      setMaxDisabled(false);
    } else {
      setMaxDisabled(true);
      setMaxFuelConsumption(0);
    }
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Fuel Consumption (1km/L)</p>
      <div className="col-span-7 flex gap-2">
        {/* Input field for min fuel consumption */}
        <Input
          type="number"
          value={minFuelConsumption === 0 ? "" : minFuelConsumption}
          onChange={handleMinChange}
          className="border border-gray-200 px-2 py-1 rounded-md bg-gray-50"
          placeholder="Min"
        />
        {/* Input field for max fuel consumption */}
        <Input
          type="number"
          value={maxFuelConsumption === 0 ? "" : maxFuelConsumption}
          onChange={handleMaxChange}
          className="border border-gray-200 px-2 py-1 rounded-md bg-gray-50"
          placeholder="Max"
          disabled={maxDisabled}
        />
      </div>
    </div>
  );
}

export default FuelConsumption;
