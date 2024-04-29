import { formatCurrency, formatDate, limitString } from "../../../utils/format";
import Button from "../../../components/ui/Button";
import carPlaceholder from "../../../assets/placeholders/img-placeholder.jpg";

import { SERVER_URL } from "../../../utils/constants";
import { ListingType } from "../../listing/clientListing";
import { useNavigate } from "react-router-dom";
import { useDeleteListingMutation } from "../listing/listingApiSlice";
import { toast } from "react-toastify";
import { GetDraftListingType, GetSellerListingType } from "../listing/sellerListing";
import { cn } from "../../../utils/mergeClasses";
import useInvalidateListings from "../../../hooks/useInvalidateListings";

type DraftItemsProps = {
  data: GetSellerListingType[],
  refetch: () => void
};

function DraftItems({ data,refetch }: DraftItemsProps) {
  const [deleteListing, { isLoading: deleting }] = useDeleteListingMutation();
  const navigate = useNavigate();
  const invalidateListings = useInvalidateListings();

  const onRequsetInspection = (id: string) => {
    navigate(`/inspection/request/${id}`);
  };

  const onResumeDraft = (id: string) => {
    navigate(`/selling/create-listing?draftId=${id}`);
  };

  const onDeleteDraft = async (id: string) => {
    try {
      await deleteListing(id);
      toast.success("Draft deleted successfully");
      invalidateListings();
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete draft");
    }
  };

  return (
    <div className="flex flex-col gap-6 my-10 text-sm">
      {data?.map((listing:GetDraftListingType) => (
        <div
          key={listing._id}
          className="text-sm flex flex-col md:grid grid-cols-12 gap-10 border p-4 rounded-lg shadow-sm md:border-none md:shadow-none"
        >
          <div className="bg-gray-100 shadow-sm rounded-lg aspect-square overflow-hidden col-span-2 w-full max-w-[10rem] md:max-w-full">
            <img
              src={listing.images && listing.images[0] ? `${SERVER_URL}/images/${listing?.images[0]}` : carPlaceholder}
              alt="listing image"
              className={cn(
                "w-full h-full object-contain",
                {
                  "object-cover": !listing.images || !listing.images[0],
                }
              )}
            />
          </div>
          <div className="col-span-8">
            <h4 className="text-base font-medium mb-5">
              {listing.title && limitString(listing.title, 80)}
            </h4>
            <div className="flex gap-10">
              <div className="flex flex-col gap-2 col-span-4">
                <div className="grid grid-cols-6 gap-2">
                  <p className="text-gray-300 col-span-2">Make</p>
                  <h4 className="col-span-4">{listing?.make}</h4>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  <p className="text-gray-300 col-span-2">Model</p>
                  <h4 className="col-span-4">{listing?.vehicleModel}</h4>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  <p className="text-gray-300 col-span-2">Format</p>
                  <h4 className="col-span-4">{listing?.listingType}</h4>
                </div>
                {listing.listingType !== ListingType.auction ? (
                  <div className="grid grid-cols-6 gap-2">
                    <p className="text-gray-300 col-span-2">Price</p>
                    <h4 className="col-span-4">
                      {listing.currentPrice && formatCurrency(listing?.currentPrice, "LKR")}
                    </h4>
                  </div>
                ) : (
                  <div className="grid grid-cols-6 gap-2">
                    <p className="text-gray-300 col-span-2">Starting Bid</p>
                    <h4 className="col-span-4">
                      {listing.auction && listing.auction.startingBid && formatCurrency(listing.auction.startingBid, "LKR")}
                    </h4>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="grid grid-cols-6 gap-2">
                  <p className="text-gray-300 col-span-2">Condition</p>
                  <h4 className="col-span-4">{listing?.condition}</h4>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  <p className="text-gray-300 col-span-2">Location</p>
                  <h4 className="col-span-4">
                    {listing?.location?.city}, {listing?.location?.division}
                  </h4>
                </div>
                <div className="grid grid-cols-6 gap-2 text-gray-300">
                  <p className=" col-span-2">Latest update</p>
                  <h4 className="col-span-4">
                    {formatDate(new Date(listing.draftUpdatedAt))}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Button
              intent="primary"
              size="medium"
              className="w-full rounded-full"
              onClick={() => onResumeDraft(listing._id)}
            >
              Resume Draft
            </Button>
            <Button
              intent="secondary"
              size="medium"
              className="w-full rounded-full"
              onClick={() => onRequsetInspection(listing._id)}
            >
              Request Inspection
            </Button>
            <Button
              intent="secondary"
              size="medium"
              className="w-full rounded-full"
              onClick={() => onDeleteDraft(listing._id)}
              disabled={deleting}
            >
              Delete Draft
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DraftItems;
