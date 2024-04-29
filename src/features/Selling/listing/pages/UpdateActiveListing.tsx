import logo from "../../../../assets/brand/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import UploadImages from "../components/UploadImages";
import Title from "../components/Title";
import VehicleItemSpecifics from "../components/VehicleItemSpecifics";
import ContainerSmall from "../../../../components/ui/ContainerSmall";
import Description from "../components/Description";
import Condition from "../components/Condition";
import ListingFormatAndPricing from "../components/ListingFormatAndPricing";
import Button from "../../../../components/ui/Button";
import ItemLocation from "../components/ItemLocation";
import { useGetListingQuery } from "../listingApiSlice";
import { useDispatch} from "react-redux";
import useUpdateListing from "../hooks/useUpdateListing";
import { ListingStates } from "../sellerListing";
import { useEffect, useState } from "react";
import { setDraftData } from "../listingSlice";

function UpdateListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listingId, setListingId] = useState<string | null>(null);
  const { data: listingData, isLoading,isSuccess,isError } = useGetListingQuery(listingId as string, {
    skip: !listingId,
  });
  
  const {updateListingHandler} = useUpdateListing({id: listingId as string});
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const listingId = searchParams.get("listingId");
    if (listingId) {
        console.log(listingId);
      setListingId(listingId);
    }else{
        navigate("/selling/active");
    }
  }, [navigate, setListingId]);

  useEffect(() => {
    if (isSuccess && listingData && listingData.data) {
      if(listingData.data.status !== ListingStates.active){
        navigate("/selling/active");
      }
      dispatch(setDraftData(listingData.data));
    }
    if(isError){
      navigate("/selling/active");
    }
  }, [dispatch, listingData, isError, isSuccess, navigate]);


  return (
    <div className="text-sm h-screen overflow-y-scroll">
      <ContainerSmall>
        {!isLoading && listingData && listingData.data && (
          <div className="flex flex-col w-full gap-16">
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
            {/* <PredictedPrice /> */}
            <ListingFormatAndPricing />
            <ItemLocation />
            <div className="flex flex-col gap-3 md:w-60 mx-auto mb-40">
              <Button intent="primary" className="rounded-full"
              onClick={updateListingHandler}
              >
                Save and Publish
              </Button>
              <Button intent="secondary" className="rounded-full"
               onClick={() => navigate("/selling/active")}
              >
                Discard Changes
              </Button>
            </div>
          </div>
        )}
      </ContainerSmall>
    </div>
  );
}

export default UpdateListing;
