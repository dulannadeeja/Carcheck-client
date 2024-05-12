import { useCallback, useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Input from "../../../../components/ui/Input";
import useNumericInputs from "../../filters/hooks/useNumericInputs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { setRange } from "../advancedSearchSlice";

function MileageFilter() {
    const dispatch = useDispatch();
    const { errors,advancedSearchOptions } = useSelector((state: RootState) => state.advancedSearch);
    const { mileageMax, mileageMin } = advancedSearchOptions;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const {
    formattedValue: formattedMaxValue,
    numericValue: maxNumericalValue,
    setNumericValue: setMaxNumericValue,
  } = useNumericInputs(
    mileageMax.toString() === "0" ? "" : mileageMax.toString()
  );
  const {
    formattedValue: formattedMinValue,
    numericValue: minNumericalValue,
    setNumericValue: setMinNumericValue,
  } = useNumericInputs(
    mileageMin.toString() === "0" ? "" : mileageMin.toString()
  );

  const onChangeValues = useCallback(() => {
    dispatch(setRange({ key: "mileage",min: minNumericalValue, max: maxNumericalValue }));
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
        <h3 className="font-medium">Mileage</h3>
        {isCollapsed ? <FiPlus /> : <FiMinus />}
      </div>
      <form className={isCollapsed ? "hidden" : ""}>
        <div className="flex gap-2 items-center justify-center">
          <Input
            type="text"
            placeholder="Min"
            value={formattedMinValue}
            onChange={(e) => setMinNumericValue(e.target.value)}
          />
          <span>to</span>
          <Input
            type="text"
            placeholder="Max"
            value={formattedMaxValue}
            onChange={(e) => setMaxNumericValue(e.target.value)}
          />
        </div>
        {errors.mileageMax && (
          <p className="text-red-300 text-sm">{errors.mileageMax}</p>
        )}
      </form>
    </div>
  );
}

export default MileageFilter;
