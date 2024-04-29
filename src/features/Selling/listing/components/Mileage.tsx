import Input from "../../../../components/ui/Input";
import { updateAndValidateFieldHandler } from "../listingSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";

function Mileage() {
  const dispatch = useDispatch();
  const { errors,data } = useSelector((state: RootState) => state.listing);
  const [tempMilage, setTempMilage] = useState<string>("");
  const [needToUpdateState, setNeedToUpdateState] = useState<boolean>(false);

  useEffect(() => {
    if(needToUpdateState){
      if (tempMilage === "") {
        dispatch(updateAndValidateFieldHandler({ field: "mileage", value: 0 }));
      } else {
        dispatch(
          updateAndValidateFieldHandler({ field: "mileage", value: parseInt(tempMilage) })
        );
      }
    }
  }, [tempMilage, dispatch, needToUpdateState]);

  useEffect(() => {
    if (data.mileage) {
      setTempMilage(data.mileage.toString());
      setNeedToUpdateState(false);
    }
  }, [data.mileage, needToUpdateState])

  const handleMileageChange = async (value: string) => {
    if (isNaN(Number(value)) && value !== "") {
      return;
    }
    setNeedToUpdateState(true);
    setTempMilage(value);
  };
  return (
    <div className="mt-6 grid grid-cols-12">
      <p className="text-sm font-medium col-span-5">Mileage</p>
      <label className="w-full border border-gray-200 flex items-center p-2 rounded-md bg-gray-50 col-span-7">
        <Input
          type="text"
          className="border-none rounded-md p-0 pr-3 focus:outline-none w-full"
          value={tempMilage}
          onChange={(e) => handleMileageChange(e.target.value)}
        />
        <span className="text-gray-300 font-medium">Km</span>
      </label>
      {errors.mileage && (
        <p className="text-red-300 text-sm col-span-12">{errors["mileage"]}</p>
      )}
    </div>
  );
}

export default Mileage;
