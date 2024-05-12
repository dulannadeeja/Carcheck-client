import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Checkbox from "../../../../components/ui/Checkbox";
import { conditionsArray } from "../../clientListing";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setAdvancedSearchOptions } from "../advancedSearchSlice";

function Condition() {
    const dispatch = useDispatch();
    const { advancedSearchOptions} = useSelector((state:RootState) => state.advancedSearch);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  // sync selected conditions with redux store
  useEffect(()=>{
    setSelectedConditions(advancedSearchOptions.conditions);
  }, [advancedSearchOptions.conditions])

  const handleConditionChange = (condition: string) => {
    if(advancedSearchOptions.conditions.includes(condition)){
        dispatch(setAdvancedSearchOptions({
            ...advancedSearchOptions,
            conditions: advancedSearchOptions.conditions.filter((c) => c !== condition)
        }))
    }else{
        dispatch(setAdvancedSearchOptions({
            ...advancedSearchOptions,
            conditions: [...advancedSearchOptions.conditions, condition]
        }))
    }
  }

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="font-medium">Select Condition</h3>
        {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
      </div>
      <div className={isCollapsed ? "hidden" : ""}>
        <ul className="flex gap-1 flex-col">
          {conditionsArray.map((condition) => (
            <li
              key={condition}
              className="flex gap-2 items-center"
            >
              <Checkbox 
              checked={selectedConditions.includes(condition)}
                onChange={() => handleConditionChange(condition)}
              />
              <label>{condition}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Condition;
