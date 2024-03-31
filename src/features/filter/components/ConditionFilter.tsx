import React from "react";
import Checkbox from "../../../components/ui/Checkbox";
import { FiMinus, FiPlus } from "react-icons/fi";

function ConditionFilter() {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        <h3 className="font-medium">Condition</h3>
        {isCollapsed ? <FiPlus /> : <FiMinus />}
      </div>
      <div className={isCollapsed ? "hidden" : ""}>
        <ul className="flex gap-1 flex-col">
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>New</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Used</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Reconditioned</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Used - Unregistered</label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ConditionFilter;
