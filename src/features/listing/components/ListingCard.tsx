import ListItem from "../../../components/ui/ListItem";
import placeholderImage from "../../../assets/images/fitted.jpg";
import {
  formatCurrency,
  formatFeedbackPercentage,
  formatMileage,
  formatTimeLeft,
  limitString,
} from "../../../utils/format";
import { GetListingType, ListingType } from "../clientListing";
import verifiedSellerSvg from "../../../assets/svg/verifiedSellerBadge.svg";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../utils/constants";
import { AccountType } from "../../authentication/auth";

function ListingCard({ listing }: { listing: GetListingType }) {
  const navigate = useNavigate();
  const isAuction = listing.listingType === ListingType.auction ? true : false;

  const isNewListing = (publishedAt: Date) => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - publishedAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  console.log(listing);

  return (
    <ListItem
      className="flex items-start gap-2 text-sm font-medium lg:text-base lg:font-normal cursor-pointer"
      onClick={() => {
        navigate(`/listing/${listing._id}`);
      }}
    >
      {/* listing image */}
      <div className="bg-gray-100 shadow-sm border border-gray-200 rounded-md aspect-square flex-grow-0 basis-4/12 md:basis-3/12">
        <img
          src={`${SERVER_URL}/images/${listing.images[0]}` || placeholderImage}
          alt="listing image"
          className="w-full h-full object-contain"
        />
      </div>
      {/* listing details */}
      <div className="flex-1 shrink-0 lg:ml-3 text-gray-300">
        <h3 className="font-medium text-gray-600 text-base lg:text-lg">
          {isNewListing(new Date(listing.publishedAt)) && (
            <span className="text-gray-300 bg-gray-150 shrink-0 inline-flex text-sm mr-1">
              NEW LISTING
            </span>
          )}
          {limitString(listing.title, 80)}
        </h3>
        <p>{listing.condition}</p>
        <div className="md:grid md:grid-cols-12 mt-5 gap-10">
          <div className="md:col-span-6 flex gap-1 flex-col">
            <p className="text-gray-600 font-medium text-lg lg:text-2xl">
              {formatCurrency(listing.currentPrice)}
            </p>
            {!isAuction && listing.isAllowedOffer && (
              <p className="">or Best Offer</p>
            )}

            {isAuction && (
              <p>
                {listing.auction.bids.length} bids ·{" "}
                {formatTimeLeft(new Date(listing.endDate))}
              </p>
            )}
            <p>
              {listing.location.city}, {listing.location.division}
            </p>
            {<p>{14} watchers</p>}
          </div>
          <div className="md:col-span-6 md:gap-1 flex-col hidden md:flex">
            <p>
              <span>Manufactured: </span>{" "}
              <span>{listing.manufacturedYear}</span>
            </p>
            <p>
              <span>Mileage: </span>{" "}
              <span>{formatMileage(listing.mileage)}</span>
            </p>
            <p>
              <span>Make: </span> <span>{listing.make}</span>
            </p>
            <p>
              <span>Model: </span> <span>{listing.vehicleModel}</span>
            </p>
            <p>
              <span>
                {listing.seller.businessInfo && listing.seller.businessInfo.businessName
                  ? listing.seller.businessInfo.businessName
                  : `${listing.seller.firstName} ${listing.seller.lastName}`}{" "}
                ({16}) {formatFeedbackPercentage(100)}
              </span>
            </p>
            {listing.seller.accountType === AccountType.sellerBusiness || listing.seller.accountType === AccountType.serviceProvider  && (
              <img src={verifiedSellerSvg} alt="" className="w-[7rem]" />
            )}
          </div>
        </div>
      </div>
    </ListItem>
  );
}

export default ListingCard;
