import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Button from "../../../../components/ui/Button";
import Checkbox from "../../../../components/ui/Checkbox";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import useMultiSelection from "../hooks/useMultiSelection";
import { conditionsArray } from "../../clientListing";

function ConditionFilter() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const visibleConditions = 5; // You might want to adjust this or remove since you only have three conditions
  const { filterOptions } = useSelector(
    (state: RootState) => state.clientListing
  );
  const { selectedItems: selectedConditions, onItemSelect: onSelectCondition } = useMultiSelection({
    filterOptions,
    categoryKey: "condition"
  });

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="font-medium">Condition</h3>
        {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
      </div>
      <div className={isCollapsed ? "hidden" : ""}>
        <ul className="flex gap-1 flex-col">
          {conditionsArray.map((condition) => (
            <li
              key={condition}
              className="flex gap-2 items-center"
              onClick={() => onSelectCondition(condition)}
            >
              <Checkbox checked={selectedConditions.includes(condition)} />
              <label>{condition}</label>
            </li>
          ))}
        </ul>
        {conditionsArray.length > visibleConditions && (
          <Button
            intent={"iconText"}
            size={"none"}
            className="mt-3 text-blue-300 items-center gap-1"
            onClick={() => setShowMore(!showMore)}
          >
            {!showMore ? (
              <>
                <span>Show more</span>
                <FiChevronDown />
              </>
            ) : (
              <>
                <span>Show less</span>
                <FiChevronUp />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ConditionFilter;
