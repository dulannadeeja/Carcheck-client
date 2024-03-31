import { useState } from "react";
import { FiChevronDown, FiMinus, FiPlus } from "react-icons/fi";
import Button from "../../../components/ui/Button";
import Checkbox from "../../../components/ui/Checkbox";

function BrandFilter() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        <h3 className="font-medium">Brand</h3>
        {isCollapsed ? <FiPlus /> : <FiMinus />}
      </div>
      <div className={isCollapsed ? "hidden" : ""}>
        <ul className="flex gap-1 flex-col">
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Toyota</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Nissan</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Mercedes</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>BMW</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Hyundai</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Land Rover</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Jeep</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Subaru</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Volvo</label>
          </li>
        </ul>
        <Button
          intent={"iconText"}
          size={"none"}
          className="mt-3 text-blue-300 items-center gap-1"
        >
          <span>Show more</span>
          <FiChevronDown />
        </Button>
      </div>
    </div>
  );
}

export default BrandFilter;
