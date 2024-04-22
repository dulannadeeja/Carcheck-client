import { useDispatch, useSelector } from "react-redux";
import RadioButton from "../../../../components/ui/RadioButton";
import { RootState } from "../../../../store/store";
import { updateFieldHandler, validateFieldHandler } from "../listingSlice";
import { Conditions } from "../../../listing/listing";

function Condition() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { condition } = data;

  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFieldHandler({ field: "condition", value: e.target.value }));
    dispatch(
      validateFieldHandler({ field: "condition", value: e.target.value })
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-lg uppercase font-medium">Condition</h3>
      <div className="flex flex-col gap-4">
        <label className="flex items-start gap-4">
          <RadioButton
            name="condition"
            value={Conditions.brandNew}
            onChange={handleConditionChange}
            checked={condition === Conditions.brandNew}
          />
          <div>
            <p className="font-medium">Brand new</p>
            <p className="text-gray-300">
              A vehicle is considered new if it is purchased directly from a new
              car franchise dealer and has not yet been registered. These
              vehicles have been driven only for demonstration purposes and
              should be in excellent running condition with a pristine interior
              and exterior.
            </p>
          </div>
        </label>
        <label className="flex items-start gap-4">
          <RadioButton
            name="condition"
            value={Conditions.preOwned}
            onChange={handleConditionChange}
            checked={condition === Conditions.preOwned}
          />
          <div>
            <p className="font-medium">Used</p>
            <p className="text-gray-300">
              A vehicle is considered used if it has been registered and issued
              a title. Used vehicles have had at least one previous owner. The
              condition of the exterior, interior, and engine can vary depending
              on the vehicle's history.
            </p>
          </div>
        </label>
        <label className="flex items-start gap-4">
          <RadioButton
            name="condition"
            value={Conditions.unregistered}
            onChange={handleConditionChange}
            checked={condition === Conditions.unregistered}
          />
          <div>
            <p className="font-medium">Unregistered</p>
            <p className="text-gray-300">
              A vehicle is considered unregistered if it has not been registered
              but pre owned. These vehicles are typically brand new and have not
              been driven except for some test drives.
            </p>
          </div>
        </label>
      </div>
      {errors.condition && (
        <p className="text-red-300 text-sm">{errors["condition"]}</p>
      )}
    </div>
  );
}

export default Condition;
