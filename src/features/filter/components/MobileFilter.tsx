import { IoClose, IoFilter } from "react-icons/io5";
import Button from "../../../components/ui/Button";
import BodyTypeFilter from "./BodyTypeFilter";
import BrandFilter from "./BrandFilter";
import ConditionFilter from "./ConditionFilter";
import DriveTypeFilter from "./DriveTypeFilter";
import FuelTypeFilter from "./FuelTypeFilter";
import MileageFilter from "./MileageFilter";
import PriceFilter from "./PriceFilter";
import SaleByFilter from "./SaleByFilter";
import TransmissionFilter from "./TransmissionFilter";
import YearOfManufacturedFilter from "./YearOfManufacturedFilter";
import { useState } from "react";

type MobileFilterProps = {
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MobileFilter({ setIsModelOpen }: MobileFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        intent="iconText"
        size="none"
        className="text-blue-300 gap-1"
        onClick={() => {
          setOpen(!open);
          setIsModelOpen(!open);
        }}
      >
        <IoFilter className="text-base"/>
        <span>Filter</span>
      </Button>
      <div
        className={
          open
            ? "fixed top-0 left-0 bottom-0 right-0 bg-white z-50 overflow-auto h-full transition-all ease-in-out duration-300 translate-x-0 opacity-100 pointer-events-auto"
            : "fixed top-0 left-0 bottom-0 right-0 bg-white z-50 overflow-auto h-full transition-all ease-in-out duration-300 opacity-0 pointer-events-none translate-x-full"
        }
      >
        <div className="grid grid-cols-3 sticky top-0 px-3 py-3 border-b bg-white z-40 items-center">
          <IoClose
            className="text-blue-300 text-xl"
            onClick={() => {
              setOpen(false);
              setIsModelOpen(false);
            }}
          />
          <div className="flex flex-col items-center">
            <h3 className="text-xl">Filter</h3>
          </div>
          <Button
            intent="iconText"
            size="none"
            className="justify-self-end text-blue-300"
          >
            Reset
          </Button>
        </div>
        <div className="px-3 py-3">
          <BodyTypeFilter />
          <hr className="my-4" />
          <BrandFilter />
          <hr className="my-4" />
          <ConditionFilter />
          <hr className="my-4" />
          <DriveTypeFilter />
          <hr className="my-4" />
          <FuelTypeFilter />
          <hr className="my-4" />
          <MileageFilter />
          <hr className="my-4" />
          <PriceFilter />
          <hr className="my-4" />
          <SaleByFilter />
          <hr className="my-4" />
          <TransmissionFilter />
          <hr className="my-4" />
          <YearOfManufacturedFilter />
        </div>
        <div className="sticky bottom-0 left-0 right-0 border-t border-b px-3 py-2 bg-white">
          <Button
            intent="primary"
            size="medium"
            className="w-full border rounded-full py-3 border-solid border-blue-300 flex justify-center items-center"
          >
            <span>Show {256} results</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MobileFilter;
