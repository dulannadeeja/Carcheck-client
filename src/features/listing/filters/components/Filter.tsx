import BrandFilter from "./BrandFilter";
import TransmissionFilter from "./TransmissionFilter";
import BodyTypeFilter from "./BodyTypeFilter";
import FuelTypeFilter from "./FuelTypeFilter";
import DriveTypeFilter from "./DriveTypeFilter";
import ConditionFilter from "./ConditionFilter";
import PriceFilter from "./PriceFilter";
import YearOfManufacturedFilter from "./YearOfManufacturedFilter";
import MileageFilter from "./MileageFilter";
import SoldByFilter from "./SaleByFilter";
import Button from "../../../../components/ui/Button";
import { useDispatch} from "react-redux";
import { resetFilterOptions } from "../../clientListingSlice";

function Filter() {
  const dispatch = useDispatch();

  const onResetFilters = () => {
    dispatch(resetFilterOptions());
  }

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
      <SoldByFilter />
      <hr className="my-4" />
      <DriveTypeFilter />
      <hr className="my-4" />
      <ConditionFilter />
      <hr className="my-4" />
      <Button intent={"secondary"} className="rounded-full" size={"small"}
        onClick={onResetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
}

export default Filter;
