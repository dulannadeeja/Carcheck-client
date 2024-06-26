import ManufacturedYear from "./ManufacturedYear";
import RegisteredYear from "./RegisteredYear";
import Mileage from "./Mileage";
import Make from "./Make";
import Model from "./Model";
import Transmission from "./Transmission";
import BodyType from "./BodyType";
import NumberOfSeats from "./NumberOfSeats";
import NumberOfDoors from "./NumberOfDoors";
import ExteriorColor from "./ExteriorColor";
import InteriorColor from "./InteriorColor";
import FuelType from "./FuelType";
import DriveType from "./DriveType";
import NumberOfPreviousOwners from "./NumberOfPreviousOwners";
import FuelConsumption from "./FuelConsumption";
import EngineCapacity from "./EngineCapacity";

function VehicleItemSpecifics() {
  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-lg uppercase font-medium">Vehicle Specifics</h3>
      <div>
        <div className="">
          <p className="text-base font-medium">Required</p>
          <p className="text-gray-300">
            Buyers need these details to find your item.
          </p>
        </div>

        {/* Manufactured year */}
        <div className="md:w-[60%]">
          <Make />
          <Model />
          <ManufacturedYear />
          <RegisteredYear />
          <Mileage />
          <Transmission />
          <FuelType />
          <BodyType />
          <DriveType />
          <NumberOfPreviousOwners />
          <EngineCapacity />
          <ExteriorColor />
        </div>
      </div>

      <div>
        <div className="">
          <p className="text-base font-medium">
            Additional <span className="font-normal">(optional)</span>
          </p>
          <p className="text-gray-300">
            Buyers need these details to find your item.
          </p>
        </div>
        <div className="md:w-[60%]">
          <NumberOfSeats />
          <NumberOfDoors />
          <InteriorColor />
          <FuelConsumption />
        </div>
      </div>
    </div>
  );
}

export default VehicleItemSpecifics;
