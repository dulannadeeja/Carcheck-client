import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiMinus, FiPlus } from "react-icons/fi";
import Button from "../../../../components/ui/Button";
import Checkbox from "../../../../components/ui/Checkbox";
import { useGetBrandsQuery } from "../../../../api/clientApiSlice";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import useMultiSelection from "../hooks/useMultiSelection";

function BrandFilter() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { data, isSuccess, isLoading } = useGetBrandsQuery();
  const [showMore, setShowMore] = useState(false);
  const visibleBrands = 5;
  const { filterOptions } = useSelector(
    (state: RootState) => state.clientListing
  );
  const { selectedItems:selectedBrands, onItemSelect:onBrandSelect } = useMultiSelection({
    filterOptions,
    categoryKey: "make"
  });

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
          {showMore &&
            isSuccess &&
            data.length > 0 &&
            data.map((brand) => (
              <li
                key={brand._id}
                className="flex gap-2 items-center"
                onClick={() => onBrandSelect(brand.name)}
              >
                <Checkbox checked={selectedBrands.includes(brand.name)} />
                <label>{brand.name}</label>
              </li>
            ))}
          {!showMore &&
            isSuccess &&
            data.length > 0 &&
            data.slice(0, visibleBrands).map((brand) => (
              <li
                key={brand._id}
                className="flex gap-2 items-center"
                onClick={() => onBrandSelect(brand.name)}
              >
                <Checkbox checked={selectedBrands.includes(brand.name)} />
                <label>{brand.name}</label>
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

export default BrandFilter;
