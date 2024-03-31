
import RadioButton from "../../../components/ui/RadioButton";

function Condition() {
  return (
    <div>
      <h3 className="text-lg uppercase font-medium my-4">Condition</h3>
      <div className="flex flex-col gap-4">
        <label className="flex items-start gap-4">
          <RadioButton name="condition" value="used" />
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
          <RadioButton name="condition" value="used" />
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
          <RadioButton name="condition" value="unregistered" />
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
    </div>
  );
}

export default Condition;
