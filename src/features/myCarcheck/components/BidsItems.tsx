import React from "react";
import { listings } from "../../../data/listings.json";
import { listingType } from "../../listing/listing";
import {
  formatCurrency,
  formatFeedbackPercentage,
  formatTimeLeft,
  limitString,
} from "../../../utils/format";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";

const listingsArray: listingType[] = [];

listings.forEach((listing) => {
  listingsArray.push(listing as listingType);
});

function BidsItems() {
  return (
    <div className="flex flex-col gap-6 my-10">
      {listingsArray.map((listing) => (
        <div
          key={listing._id}
          className="text-sm flex flex-col md:grid grid-cols-12 gap-6 border p-4 rounded-lg shadow-sm md:border-none md:shadow-none"
        >
          <div className="bg-gray-100 shadow-sm rounded-lg aspect-square overflow-hidden col-span-2 w-full max-w-[10rem] md:max-w-full">
            <img
              src={listing.images[0]}
              alt="listing image"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-1 col-span-4">
            <p className="text-lg text-green-800 uppercase">Winning</p>
            <h4 className="text-base">{limitString(listing.title, 50)}</h4>
            <p className="text-gray-300">
              <Link to="" className="text-blue-300 underline">
                {listing.seller.username}
              </Link>{" "}
              |{" "}
              <Link to="" className="text-blue-300 underline">
                {listing.seller.feedbacks}
              </Link>{" "}
              | {formatFeedbackPercentage(listing.seller.precentage)}
            </p>
            <p className="text-gray-300">
              Your max bid: {formatCurrency(listing.price, "LKR")}
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-green-600 font-medium text-lg">
              {formatCurrency(listing.auction.currentBid, "LKR")}
            </p>
            <Link to="" className="text-blue-300 underline">
              <p>{listing.auction.bidders} bids</p>
            </Link>
            <p className="text-gray-300 font-medium">
              {formatTimeLeft(new Date(listing.auction.endDateTime))}
            </p>
          </div>
          <div className="flex flex-col gap-2 col-span-3">
            <Button
              intent="primary"
              size="medium"
              className="w-full rounded-full"
            >
              Increase bid
            </Button>
            <Button
              intent="secondary"
              size="medium"
              className="w-full rounded-full"
            >
              Contact Seller
            </Button>
            <Button
              intent="secondary"
              size="medium"
              className="w-full rounded-full"
            >
              Buy it now
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BidsItems;
