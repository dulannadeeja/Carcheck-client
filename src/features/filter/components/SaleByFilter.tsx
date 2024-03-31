import React from "react";
import Checkbox from "../../../components/ui/Checkbox";
import { FiMinus, FiPlus } from "react-icons/fi";

function SaleByFilter() {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        <h3 className="font-medium">For Sale By</h3>
        {isCollapsed ? <FiPlus /> : <FiMinus />}
      </div>
      <div className={isCollapsed ? "hidden" : ""}>
        <ul className="flex gap-1 flex-col">
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Dealer</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Owner</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Broker</label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SaleByFilter;
