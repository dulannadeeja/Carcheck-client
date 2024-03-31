import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

function PriceFilter() {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        <h3 className="font-medium">Price (LKR)</h3>
        {isCollapsed ? <FiPlus /> : <FiMinus />}
      </div>
      <form className={isCollapsed ? "hidden" : ""}>
        <div className="flex gap-2 items-center justify-center">
          <Input type="number" placeholder="Min" />
          <span>to</span>
          <Input type="number" placeholder="Max" />
        </div>
        <Button
          type="submit"
          intent="secondary"
          size="small"
          className="w-full mt-3 border-gray-200 bg-gray-100 rounded-md font-medium"
        >
          Apply
        </Button>
      </form>
    </div>
  );
}

export default PriceFilter;
