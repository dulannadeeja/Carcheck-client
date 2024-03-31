import BrandFilter from "./BrandFilter";
import TransmissionFilter from "./TransmissionFilter";
import BodyTypeFilter from "./BodyTypeFilter";
import FuelTypeFilter from "./FuelTypeFilter";
import SaleByFilter from "./SaleByFilter";
import DriveTypeFilter from "./DriveTypeFilter";
import ConditionFilter from "./ConditionFilter";
import PriceFilter from "./PriceFilter";
import YearOfManufacturedFilter from "./YearOfManufacturedFilter";
import MileageFilter from "./MileageFilter";

function Filter() {
  return (
    <div className="text-sm">
      <PriceFilter />
      <hr className="my-4" />
      <YearOfManufacturedFilter />
      <hr className="my-4" />
      <MileageFilter />
      <hr className="my-4" />
      <BrandFilter />
      <hr className="my-4" />
      <TransmissionFilter />
      <hr className="my-4" />
      <BodyTypeFilter />
      <hr className="my-4" />
      <FuelTypeFilter />
      <hr className="my-4" />
      <SaleByFilter />
      <hr className="my-4" />
      <DriveTypeFilter />
      <hr className="my-4" />
      <ConditionFilter />
    </div>
  );
}

export default Filter;
