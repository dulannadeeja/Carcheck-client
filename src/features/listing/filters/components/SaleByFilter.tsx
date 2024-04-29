import { useMemo, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Button from "../../../../components/ui/Button";
import Checkbox from "../../../../components/ui/Checkbox";
import { useSelector } from "react-redux";
import useMultiSelection from "../hooks/useMultiSelection";
import { RootState } from "../../../../store/store";

enum SoldBy {
    individual = 'Individual Seller',
    dealer = 'Vehicle Dealer',
    serviceProvider = 'Service Provider',
}

function SoldByFilter() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const { filterOptions } = useSelector((state: RootState) => state.clientListing);
  const { selectedItems: selectedAccountTypes, onItemSelect: onSelectAccountType } = useMultiSelection({
    filterOptions,
    categoryKey: "soldBy"
  });

  const accountTypes = useMemo(()=>{
    return Object.values(SoldBy);
  }, [])

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="font-medium">Sold By</h3>
        {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
      </div>
      <div className={!isCollapsed ? "" : "hidden"}>
        <ul className="flex flex-col gap-1">
          {accountTypes.map((type) => (
            <li
              key={type}
              className="flex items-center gap-2"
              onClick={() => onSelectAccountType(type as string)}
            >
              <Checkbox checked={selectedAccountTypes.includes(type as string)} />
              <label>{type}</label>
            </li>
          ))}
        </ul>
        <Button
            intent="iconText"
            size="none"
            className="mt-3 text-blue-300 flex items-center gap-1"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show less' : 'Show more'}
            {showMore ? <FiChevronUp /> : <FiChevronDown />}
        </Button>
      </div>
    </div>
  );
}

export default SoldByFilter;
