import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Checkbox from "../../../components/ui/Checkbox";

function TransmissionFilter() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        <h3 className="font-medium">Transmission</h3>
        {isCollapsed ? <FiPlus /> : <FiMinus />}
      </div>
      <div className={isCollapsed ? "hidden" : ""}>
        <ul className="flex gap-1 flex-col">
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Automatic</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Manual</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Triptonic</label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TransmissionFilter;
