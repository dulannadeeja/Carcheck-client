import React, { useCallback, useEffect } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Input from "../../../../components/ui/Input";
import useNumericInputs from "../../filters/hooks/useNumericInputs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { setRange } from "../advancedSearchSlice";


function PriceFilter() {
    const dispatch = useDispatch();
    const { errors,advancedSearchOptions } = useSelector((state: RootState) => state.advancedSearch);
    const { priceMax, priceMin } = advancedSearchOptions;
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const {
    formattedValue: formattedMaxValue,
    numericValue: maxNumericalValue,
    setNumericValue: setMaxNumericValue,
  } = useNumericInputs(
    priceMax.toString() === "0" ? "" : priceMax.toString()
  );
  const {
    formattedValue: formattedMinValue,
    numericValue: minNumericalValue,
    setNumericValue: setMinNumericValue,
  } = useNumericInputs(
    priceMin.toString() === "0" ? "" : priceMin.toString()
  );

  const onChangeValues = useCallback(() => {
    dispatch(setRange({ key: "price",min: minNumericalValue, max: maxNumericalValue }));
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
        <h3 className="font-medium">Price (LKR)</h3>
        {isCollapsed ? <FiPlus /> : <FiMinus />}
      </div>
      <form className={isCollapsed ? "hidden" : ""}>
        <div className="flex gap-2 items-center justify-center">
          <Input
            type="text"
            placeholder="Min"
            value={formattedMinValue as string}
            onChange={(e) => {
              setMinNumericValue(e.target.value);
            }}
          />
          <span>to</span>
          <Input
            type="text"
            placeholder="Max"
            value={formattedMaxValue as string}
            onChange={(e) => {
              setMaxNumericValue(e.target.value);
            }}
          />
        </div>
        {errors.priceMax && (
          <p className="text-red-300 text-sm">{errors.priceMax}</p>
        )}
      </form>
    </div>
  );
}

export default PriceFilter;
