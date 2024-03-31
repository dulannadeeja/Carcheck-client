import logo from "../../../assets/brand/logo.svg";
import { Link } from "react-router-dom";
import UploadImages from "../components/UploadImages";
import Title from "../components/Title";
import VehicleItemSpecifics from "../components/VehicleItemSpecifics";
import ContainerSmall from "../../../components/ui/ContainerSmall";
import Description from "../components/Description";
import Condition from "../components/Condition";
import ListingFormatAndPricing from "../components/ListingFormatAndPricing";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import Button from "../../../components/ui/Button";

function AddListing() {
  return (
    <div className="text-sm h-screen overflow-y-scroll">
      <ContainerSmall>
        <div className="flex justify-center my-5">
          <Link to="/">
            <img src={logo} alt="logo" className="w-40" />
          </Link>
        </div>
        <hr />
        <UploadImages />
        <Title />
        <Condition />
        <VehicleItemSpecifics />
        <Description />
        <ListingFormatAndPricing />
        <Shipping />
        <Payment />
        <div className="flex flex-col gap-3 md:w-60 mx-auto mb-40">
          <Button intent="primary" className="rounded-full">
            Submit Listing
          </Button>
          <Button intent="secondary" className="rounded-full">
            Preview Listing
          </Button>
          <Button intent="secondary" className="rounded-full">
            Save Draft
          </Button>
        </div>
      </ContainerSmall>
    </div>
  );
}

export default AddListing;
