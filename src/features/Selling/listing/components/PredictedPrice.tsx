import { useCallback, useEffect, useState } from "react";
import { usePredictMutation } from "../../../../api/predictionApiSlice";
import { formatCurrency } from "../../../../utils/format";

type PredictedPriceProps = {
  data: {
    make: string;
    vehicleModel: string;
    manufacturedYear: number;
    registeredYear: number;
    mileage: number;
    numberOfPreviousOwners: number;
    exteriorColor: string;
    condition: string;
    bodyType: string;
    engineCapacity: number;
    fuelType: string;
    transmission: string;
  };
};

function PredictedPrice({ data }: PredictedPriceProps) {
  const [PredictedPrice, setPredictedPrice] = useState(0);

  const [predict] = usePredictMutation();

  const handlePredict = useCallback(async () => {
    try {
      const response = await predict({
        ...data,
      }).unwrap();
      const noDecimals = response.predicted_price.toFixed(0);
      setPredictedPrice(noDecimals);
    } catch (error) {
      return;
    }
  }, [data, predict]);

  useEffect(() => {
    // check if all fields are valid
    handlePredict();
  }, [handlePredict, data]);

  const getNormalizedOutput = (value: number) => {
    // if the value is greater than 100000000, round it to the nearest 10000000
    if (value >= 100000000) {
      return Math.ceil(value / 10000000) * 10000000;
    }

    // if the value is greater than 10000000, round it to the nearest 1000000
    if (value >= 10000000) {
      return Math.ceil(value / 1000000) * 1000000;
    }

    // if the value is greater than 1000000, round it to the nearest 100000
    if (value >= 1000000) {
      return Math.ceil(value / 100000) * 100000;
    }

    // if the value is greater than 100000, round it to the nearest 10000
    if (value >= 100000) {
      return Math.ceil(value / 10000) * 10000;
    }

    // if the value is greater than 10000, round it to the nearest 1000
    if (value >= 10000) {
      return Math.ceil(value / 1000) * 1000;
    }

    // if the value is greater than 1000, round it to the nearest 100
    if (value >= 1000) {
      return Math.ceil(value / 100) * 100;
    }

    return value;
  };

  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-lg uppercase font-medium">Predicted price</h3>
      <div>
        <p className="text-gray-300">
          We give you a value of your car based on the information you provide,
          this is just an estimate and the actual price may vary. carcheck
          empowers you to make an informed decision when buying or selling a
          car.
        </p>
        <div className="flex gap-4 items-center mt-4">
          {PredictedPrice > 0 ? (
            <p className="text-green-600 text-lg font-medium">
              {formatCurrency(getNormalizedOutput(PredictedPrice), "LKR")}
            </p>
          ) : (
            <p className="text-gray-300">Calculating...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PredictedPrice;
