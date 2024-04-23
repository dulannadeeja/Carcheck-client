import { ChangeEvent, useEffect, useState } from "react";
import Input from "../../../../components/ui/Input";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrors,
  updateFieldHandler,
  validateFieldHandler,
} from "../listingSlice";

function FuelConsumption() {
  const dispatch = useDispatch();
  const { errors } = useSelector((state: RootState) => state.listing);

  // State variables for max and min fuel consumption
  const [tempMax, setTempMax] = useState<string>("");
  const [tempMin, setTempMin] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  useEffect(() => {
    // Update the max and min fuel consumption fields in the store
    if (tempMax !== "") {
      dispatch(
        updateFieldHandler({
          field: "maxFuelConsumption",
          value: parseInt(tempMax),
        })
      );
      dispatch(
        validateFieldHandler({
          field: "maxFuelConsumption",
          value: parseInt(tempMax),
        })
      );
    } else {
      if (isTouched) {
        dispatch(
          updateFieldHandler({
            field: "maxFuelConsumption",
            value: 0,
          })
        );
        dispatch(
          validateFieldHandler({
            field: "maxFuelConsumption",
            value: 0,
          })
        );
      }
    }
    if (tempMin !== "") {
      dispatch(
        updateFieldHandler({
          field: "minFuelConsumption",
          value: parseInt(tempMin),
        })
      );
      dispatch(
        validateFieldHandler({
          field: "minFuelConsumption",
          value: parseInt(tempMin),
        })
      );
    } else {
      if (isTouched) {
        dispatch(
          updateFieldHandler({
            field: "minFuelConsumption",
            value: 0,
          })
        );
        dispatch(
          validateFieldHandler({
            field: "minFuelConsumption",
            value: 0,
          })
        );
      }
    }

    // compare max and min fuel consumption
    if (tempMax !== "" && tempMin !== "") {
      if (parseInt(tempMax) < parseInt(tempMin)) {
        const newErrors = { ...errors };
        newErrors.maxFuelConsumption =
          "Maximum fuel consumption must be higher than minimum.";
        dispatch(setErrors(newErrors));
      }
    }
  }, [tempMax, tempMin, dispatch, isTouched, errors]);

  // Function to handle changes in max fuel consumption input
  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    // check if the input is a number
    if (isNaN(Number(event.target.value))) {
      setTempMax("");
      return;
    }
    setTempMax(event.target.value);
  };

  // Function to handle changes in min fuel consumption input
  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    // check if the input is a number
    if (isNaN(Number(event.target.value))) {
      return;
    }
    setTempMin(event.target.value);
  };

  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Fuel Consumption (1km/L)</p>
      <div className="col-span-7 flex gap-2">
        {/* Input field for min fuel consumption */}
        <div>
          <Input
            type="text"
            value={tempMin}
            onChange={handleMinChange}
            className="border border-gray-200 px-2 py-1 rounded-md bg-gray-50"
            placeholder="Min"
          />
          {errors.minFuelConsumption && (
            <p className="text-red-300 text-sm mt-1">
              {errors.minFuelConsumption}
            </p>
          )}
        </div>
        {/* Input field for max fuel consumption */}
        <div>
          <Input
            type="text"
            value={tempMax}
            onChange={handleMaxChange}
            className="border border-gray-200 px-2 py-1 rounded-md bg-gray-50"
            placeholder="Max"
          />

          {errors.maxFuelConsumption && (
            <p className="text-red-300 text-sm mt-1">
              {errors.maxFuelConsumption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FuelConsumption;
