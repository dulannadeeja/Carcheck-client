import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Button from "../../../../components/ui/Button";
import Checkbox from "../../../../components/ui/Checkbox";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import useMultiSelection from "../hooks/useMultiSelection";
import { useGetSpecsQuery } from "../../../../api/clientApiSlice";

function BodyTypeFilter() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { data, isSuccess, isLoading } = useGetSpecsQuery("categories");
  const [showMore, setShowMore] = useState(false);
  const visibleBodyTypes = 5;
  const { filterOptions } = useSelector(
    (state: RootState) => state.clientListing
  );
  const { selectedItems: selectedBodyTypes, onItemSelect: onSelectBodyType } = useMultiSelection({
    filterOptions,
    categoryKey: "bodyType"
  });

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="font-medium">Body Type</h3>
        {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
      </div>
      <div className={isCollapsed ? "hidden" : ""}>
        <ul className="flex gap-1 flex-col">
          {showMore &&
            isSuccess &&
            data.length > 0 &&
            data.map((bodyType) => (
              <li
                key={bodyType._id}
                className="flex gap-2 items-center"
                onClick={() => onSelectBodyType(bodyType.name)}
              >
                <Checkbox checked={selectedBodyTypes.includes(bodyType.name)} />
                <label>{bodyType.name}</label>
              </li>
            ))}
          {!showMore &&
            isSuccess &&
            data.length > 0 &&
            data.slice(0, visibleBodyTypes). map((bodyType) => (
              <li
                key={bodyType._id}
                className="flex gap-2 items-center"
                onClick={() => onSelectBodyType(bodyType.name)}
              >
                <Checkbox checked={selectedBodyTypes.includes(bodyType.name)} />
                <label>{bodyType.name}</label>
              </li>
            ))}
          {isLoading && <p>Loading...</p>}
        </ul>
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
      </div>
    </div>
  );
}

export default BodyTypeFilter;
