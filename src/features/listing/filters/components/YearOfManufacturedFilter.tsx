import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import useYearInput from "../hooks/useYearInput";
import { setFilterOptions, setIsNeedToUpdateURL } from "../../clientListingSlice";

function YearOfManufacturedFilter() {
  const dispatch = useDispatch();
  const { filterOptions } = useSelector(
    (state: RootState) => state.clientListing
  );
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [error, setError] = useState("");
  const [initialMaxValue, setInitialMaxValue] = useState(filterOptions.yearMax);
  const [initialMinValue, setInitialMinValue] = useState(filterOptions.yearMin);
  const {
    formattedValue: formattedMaxValue,
    numericValue: maxNumericalValue,
    setNumericValue: setMaxNumericValue,
  } = useYearInput(initialMaxValue as string);
  const {
    formattedValue: formattedMinValue,
    numericValue: minNumericalValue,
    setNumericValue: setMinNumericValue,
  } = useYearInput(initialMinValue as string);

  useEffect(()=>{
    setInitialMaxValue(filterOptions.yearMax);
    setInitialMinValue(filterOptions.yearMin);
  },[filterOptions.yearMax, filterOptions.yearMin])

  const onApply = () => {
    if (
      maxNumericalValue &&
      minNumericalValue &&
      (maxNumericalValue <= minNumericalValue)
    ) {
      setError("Looks like values doesn't match!");
      return;
    } else {
      setError("");
    }
    dispatch(
      setFilterOptions({
        ...filterOptions,
        yearMax: maxNumericalValue === 0 ? "" : maxNumericalValue as unknown as string,
        yearMin: minNumericalValue === 0 ? "" : minNumericalValue as unknown as string,
      })
    );
    dispatch(setIsNeedToUpdateURL(true));
  };

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        <h3 className="font-medium">Year of Manufactured</h3>
        {isCollapsed ? <FiPlus /> : <FiMinus />}
      </div>
      <form className={isCollapsed ? "hidden" : ""}
        onSubmit={(e) => {
          e.preventDefault();
          onApply();
        }}
      >
        <div className="flex gap-2 items-center justify-center">
          <Input type="text" placeholder="Min" 
            value={formattedMinValue as string}
            onChange={(e) => setMinNumericValue(e.target.value)}
          />
          <span>to</span>
          <Input type="text" placeholder="Max"
            value={formattedMaxValue as string}
            onChange={(e) => setMaxNumericValue(e.target.value)}
           />
        </div>
        {
          error && <p className="text-red-300 text-sm mt-1 mb-2">{error}</p>
        }
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

export default YearOfManufacturedFilter;
