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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearListing, setDraftData } from "../listingSlice";
import useUpdateDraft from "../hooks/useUpdateDraft";
import useCreateListing from "../hooks/useListingCreate";
import { RootState } from "../../../../store/store";
import { GetDraftListingType, ListingStates } from "../sellerListing";
import Preview from "./Preview";

function CreateListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [draftId, setDraftId] = useState<string | null>(null);
  const { data: draftData, isLoading,isSuccess,isError } = useGetListingQuery(draftId as string, {
    skip: !draftId,
  });
  const { data } = useSelector((state: RootState) => state.listing);
  const {updateDraftHandler} = useUpdateDraft({id: draftId as string});
  const { createNewListing } = useCreateListing({ draftData: data, draftId: draftId as string });
  const [showPreview, setShowPreview] = useState(false);

  useEffect(()=>{
    dispatch(clearListing());
  },[dispatch])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const draftId = searchParams.get("draftId");
    if (draftId) {
      setDraftId(draftId);
    }
  }, [setDraftId]);

  useEffect(() => {
    if (isSuccess && draftData && draftData.data) {
      if(draftData.data.status !== ListingStates.draft && draftData.data.status !== ListingStates.unsold){
        navigate("/selling/drafts");
      }
      dispatch(setDraftData(draftData.data));
    }
    if(isError){
      navigate("/selling/drafts");
    }
  }, [dispatch, draftData, isError, isSuccess, navigate]);

  const onClosePreview = () => {
    setShowPreview(false);
  }

  const onSaveForLater = () => {
    updateDraftHandler();
    navigate("/selling/drafts");
  }


  return (
    <div className="text-sm h-screen overflow-y-scroll">
      <ContainerSmall>
        {!isLoading && draftData && draftData.data && (
          <>
          {/* listing preview model */}
          {
            showPreview && <Preview listingData={data as unknown as GetDraftListingType} onClose={onClosePreview}/>
          }
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
            onClick={createNewListing}
            >
              List Item
            </Button>
            <Button intent="secondary" className="rounded-full"
            onClick={onSaveForLater}
            >
              Save for Later
            </Button>
            <Button intent="secondary" className="rounded-full"
            onClick={() => setShowPreview(true)}
            >
              Preview Listing
            </Button>
          </div>
        </div></>
        )}
      </ContainerSmall>
    </div>
  );
}

export default CreateListing;
