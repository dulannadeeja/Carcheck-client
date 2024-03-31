import ListItem from "../../../components/ui/ListItem";
import placeholderImage from "../../../assets/images/fitted.jpg";
import { isNewListing, listingType } from "../listing";
import {
  formatCurrency,
  formatFeedbackPercentage,
  formatMileage,
  formatTimeLeft,
  limitString,
} from "../../../utils/format";
import { Fragment } from "react";
import verifiedSvg from "../../../assets/svg/verifiedBadge.svg";
import verifiedSellerSvg from "../../../assets/svg/verifiedSellerBadge.svg";

function ListingCard({ listing }: { listing: listingType }) {
  const isVehicle =
    listing.listingType === "fixed-vehicle" ||
    listing.listingType === "auction-vehicle"
      ? true
      : false;
  const isAuction =
    listing.listingType === "auction-vehicle" ||
    listing.listingType === "auction-sparepart"
      ? true
      : false;

  return (
    <ListItem className="flex items-start gap-2 text-sm font-medium lg:text-base lg:font-normal">
      {/* listing image */}
      <div className="bg-gray-100 shadow-sm border border-gray-200 rounded-md aspect-square flex-grow-0 basis-4/12 md:basis-3/12">
        <img
          src={placeholderImage}
          alt="listing image"
          className="w-full h-full object-contain"
        />
      </div>
      {/* listing details */}
      <div className="flex-1 shrink-0 lg:ml-3 text-gray-300">
        <h3 className="font-medium text-gray-600 text-base lg:text-lg">
          {isNewListing(new Date(listing.createdAt)) && (
            <span className="text-gray-300 bg-gray-150 shrink-0 inline-flex text-sm mr-1">
              NEW LISTING
            </span>
          )}
          {limitString(listing.title, 80)}
        </h3>
        <p>{listing.condition}</p>
        <div className="md:grid md:grid-cols-12 mt-5">
          <div className="md:col-span-6 flex gap-1 flex-col">
            <p className="text-gray-600 font-medium text-lg lg:text-2xl">
              {!isAuction
                ? formatCurrency(listing.price, "LKR")
                : formatCurrency(listing.auction.currentBid, "LKR")}
            </p>
            {!isAuction && listing.isOffersEligible && (
              <p className="">or Best Offer</p>
            )}

            {isAuction && (
              <p>
                {listing.auction.bidders} bids ·{" "}
                {formatTimeLeft(new Date(listing.auction.endDateTime))}
              </p>
            )}
            <p>
              {listing.city}, {listing.division}
            </p>
            {listing.watchers > 0 && <p>{listing.watchers} watchers</p>}
            {!isVehicle && (
              <Fragment>
                {listing.sparepart.isFreeReturnEligible && (
                  <p>
                    <span>Free Returns</span>
                  </p>
                )}
                {listing.sparepart.isAllMostGone && (
                  <p className="text-red-600 font-medium">
                    <span>Almost Gone</span>
                  </p>
                )}
                {listing.sparepart.soldCount > 10 && (
                  <p className="font-medium text-gray-600">
                    <span>{listing.sparepart.soldCount} sold</span>
                  </p>
                )}
              </Fragment>
            )}
          </div>
          <div className="md:col-span-6 md:gap-1 flex-col hidden md:flex">
            {isVehicle && (
              <Fragment>
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
              </Fragment>
            )}
            {!isVehicle && (
              <Fragment>
                <p className="flex items-center gap-2">
                  <span>
                    <img src={verifiedSvg} alt="" className="w-4 h-4" />{" "}
                  </span>
                  <span>{listing.sparepart.warrenty}</span>
                </p>
                <p>
                  <span>In store Pickup</span>
                </p>
              </Fragment>
            )}
            <p>
              <span>
                {listing.seller.username} ({listing.seller.feedbacks}){" "}
                {formatFeedbackPercentage(listing.seller.precentage)}
              </span>
            </p>
            {listing.seller.isVerifiedBusiness && (
              <img src={verifiedSellerSvg} alt="" className="w-[7rem]" />
            )}
          </div>
        </div>
      </div>
    </ListItem>
  );
}

export default ListingCard;
