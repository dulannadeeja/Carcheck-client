import React from "react";
import Input from "../../../components/ui/Input";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";

function Mileage() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { mileage } = data;

  const handleMileageChange = async (value:string) => {


    // if zero is in the beginning, remove it
    if(value.length > 1 && value[0] === "0"){
      value = value.slice(1);
    }

    let number = parseInt(value);
    if(isNaN(number)){
      number = 0;
    }
    dispatch(updateFieldHandler({ field: "mileage", value:number }));
    dispatch(
      validateFieldHandler({
        field: "mileage",
        value:number
      })
    );
  };
  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Mileage</p>
      <Input
        placeholder="Enter your own mileage"
        className="border-gray-200 bg-gray-100 col-span-7"
        onChange={(e) => {
          handleMileageChange(e.target.value);
        }}
        type="number"
        value={mileage === 0 ? "" : mileage.toString()}
      />
      {errors.mileage && (
        <p className="text-red-300 text-sm col-span-12">{errors["mileage"]}</p>
      )}
    </div>
  );
}

export default Mileage;
