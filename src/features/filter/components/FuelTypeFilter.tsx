import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Checkbox from "../../../components/ui/Checkbox";

function FuelTypeFilter() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        <h3 className="font-medium">Fuel Type</h3>
        {isCollapsed ? <FiPlus /> : <FiMinus />}
      </div>
      <div className={isCollapsed ? "hidden" : ""}>
        <ul className="flex gap-1 flex-col">
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Petrol</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Diesel</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Electric</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Hybrid</label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FuelTypeFilter;
