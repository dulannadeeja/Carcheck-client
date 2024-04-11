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
    <div className="">
      <div className="my-4">
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
      </div>

      <div className="my-4">
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
        <ExteriorColor />
        <InteriorColor />
        <FuelConsumption />
      </div>
      
    </div>
  );
}

export default VehicleItemSpecifics;
