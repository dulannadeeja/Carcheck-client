import { useCallback, useEffect, useState } from "react";
import { usePredictMutation } from "../../listing/services/predictionApiSlice";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/format";

function PredictedPrice() {
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const [PredictedPrice, setPredictedPrice] = useState(0);
  const {
    make,
    vehicleModel,
    manufacturedYear,
    registeredYear,
    mileage,
    numberOfPreviousOwners,
    exteriorColor,
    condition,
    bodyType,
    engineCapacity,
    fuelType,
    transmission,
  } = data;
  const {
    make: makeError,
    vehicleModel: modelError,
    manufacturedYear: manufacturedYearError,
    registeredYear: registeredYearError,
    mileage: mileageError,
    numberOfPreviousOwners: numberOfPreviousOwnersError,
    exteriorColor: exteriorColorError,
    condition: conditionError,
    bodyType: bodyTypeError,
    engineCapacity: engineCapacityError,
    fuelType: fuelTypeError,
    transmission: transmissionError,
  } = errors;
  const [predict] = usePredictMutation();

  const handlePredict = useCallback(async () => {
    try {
      console.log("Predicting price...");
      console.log({
        make,
        model: vehicleModel,
        manufacturedYear,
        registeredYear,
        mileage,
        previousOwners: numberOfPreviousOwners,
        exteriorColor,
        condition,
        bodyType,
        engineCapacity,
        fuelType,
        transmission,
      });
      const response = await predict({
        make,
        model: vehicleModel,
        manufacturedYear,
        registeredYear,
        mileage,
        previousOwners: numberOfPreviousOwners,
        exteriorColor,
        condition: "used",
        bodyType,
        engineCapacity,
        fuelType,
        transmission,
      }).unwrap();
      const noDecimals = response.predicted_price.toFixed(0);
        setPredictedPrice(noDecimals);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, [make, vehicleModel, manufacturedYear, registeredYear, mileage, numberOfPreviousOwners, exteriorColor, condition, bodyType, engineCapacity, fuelType, transmission, predict]);

  useEffect(() => {
    console.log(data);
    // check if all fields are valid
    handlePredict();
  }, [
    data,
    errors,
    make,
    vehicleModel,
    manufacturedYear,
    registeredYear,
    mileage,
    numberOfPreviousOwners,
    exteriorColor,
    condition,
    bodyType,
    engineCapacity,
    fuelType,
    transmission,
    makeError,
    modelError,
    manufacturedYearError,
    registeredYearError,
    mileageError,
    numberOfPreviousOwnersError,
    exteriorColorError,
    conditionError,
    bodyTypeError,
    engineCapacityError,
    fuelTypeError,
    transmissionError,
    handlePredict,
  ]);

  return (
    <div>
      <h3 className="text-lg uppercase font-medium mb-4">Predicted price</h3>
      <p className="text-gray-300">
        We give you a value of your car based on the information you provide,
        this is just an estimate and the actual price may vary. carcheck
        empowers you to make an informed decision when buying or selling a car.
      </p>
      <div className="flex gap-4 items-center mt-4">
        
        {
            PredictedPrice>0 ? (<p className="text-green-600 text-lg font-medium">{formatCurrency(PredictedPrice,"LKR")}</p>)
            : (<p className="text-gray-300">Calculating...</p>)
        }
      </div>
    </div>
  );
}

export default PredictedPrice;
