import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Checkbox from "../../../components/ui/Checkbox";

function BodyTypeFilter() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        <h3 className="font-medium">Body Type</h3>
        {isCollapsed ? <FiPlus /> : <FiMinus />}
      </div>
      <div className={isCollapsed ? "hidden" : ""}>
        <ul className="flex gap-1 flex-col">
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Sedan</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>SUV</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Truck</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Van</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Wagon</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Coupe</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Convertible</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Hatchback</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Minivan</label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BodyTypeFilter;
