import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Checkbox from "../../../components/ui/Checkbox";

function DriveTypeFilter() {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        <h3 className="font-medium">Drive Type</h3>
        {isCollapsed ? <FiPlus /> : <FiMinus />}
      </div>
      <div className={isCollapsed ? "hidden" : ""}>
        <ul className="flex gap-1 flex-col">
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>2WD</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>4WD</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>AWD</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>FWD</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>RWD</label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DriveTypeFilter;
