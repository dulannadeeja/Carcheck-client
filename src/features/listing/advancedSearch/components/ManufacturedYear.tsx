import { useCallback, useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Input from "../../../../components/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import useYearInput from "../../filters/hooks/useYearInput";
import { setRange } from "../advancedSearchSlice";



function ManufacturedYear() {
    const dispatch = useDispatch();
    const { errors,advancedSearchOptions } = useSelector((state: RootState) => state.advancedSearch);
    const { yearMax, yearMin } = advancedSearchOptions;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const {
    formattedValue: formattedMaxValue,
    numericValue: maxNumericalValue,
    setNumericValue: setMaxNumericValue,
  } = useYearInput(yearMax.toString() === "0" ? "" : yearMax.toString());
  const {
    formattedValue: formattedMinValue,
    numericValue: minNumericalValue,
    setNumericValue: setMinNumericValue,
  } = useYearInput(yearMin.toString() === "0" ? "" : yearMin.toString());

  const onChangeValues = useCallback(() => {
    dispatch(setRange({ key: "year",min: minNumericalValue, max: maxNumericalValue }));
  }, [dispatch, minNumericalValue, maxNumericalValue]);

  useEffect(() => {
    onChangeValues();
  }, [onChangeValues]);

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
      <form className={isCollapsed ? "hidden" : ""}>
        <div className="flex gap-2 items-center justify-center">
          <Input
            type="text"
            placeholder="Min"
            value={formattedMinValue as string}
            onChange={(e) => setMinNumericValue(e.target.value)}
          />
          <span>to</span>
          <Input
            type="text"
            placeholder="Max"
            value={formattedMaxValue as string}
            onChange={(e) => setMaxNumericValue(e.target.value)}
          />
        </div>
        {errors.yearMax && (
          <p className="text-red-300 text-sm mt-1 mb-2">{errors.yearMax}</p>
        )}
      </form>
    </div>
  );
}

export default ManufacturedYear;
