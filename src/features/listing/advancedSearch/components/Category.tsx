import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useGetSpecsQuery } from "../../../../api/clientApiSlice";
import Checkbox from "../../../../components/ui/Checkbox";
import { setAdvancedSearchOptions } from "../advancedSearchSlice";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function Category() {
  const dispatch = useDispatch();
  const { advancedSearchOptions } = useSelector(
    (state: RootState) => state.advancedSearch
  );
  const { data: bodyTypeData, isSuccess } = useGetSpecsQuery("categories");

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleCategoryChange = (category: string) => {
    if (advancedSearchOptions.categories.includes(category)) {
      dispatch(
        setAdvancedSearchOptions({
          ...advancedSearchOptions,
          categories: advancedSearchOptions.categories.filter(
            (c) => c !== category
          ),
        })
      );
    } else {
      dispatch(
        setAdvancedSearchOptions({
          ...advancedSearchOptions,
          categories: [...advancedSearchOptions.categories, category],
        })
      );
    }
  };

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="font-medium">Select Category</h3>
        {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
      </div>
      <div className={isCollapsed ? "hidden" : ""}>
        <ul className="flex gap-1 flex-col">
          {isSuccess &&
            bodyTypeData.map((category) => (
              <li key={category.value} className="flex gap-2 items-center">
                <Checkbox
                  checked={advancedSearchOptions.categories.includes(
                    category.value
                  )}
                  onChange={() => handleCategoryChange(category.value)}
                />
                <label>{category.name}</label>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Category;
