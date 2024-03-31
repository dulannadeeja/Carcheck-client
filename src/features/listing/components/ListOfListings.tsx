import { listingType } from "../listing";
import listings from "../../../data/listings.json";
import ListingCard from "./ListingCard";
import { Fragment, ReactNode } from "react";

function ListOfListings() {
  const makeListOfListings = (listings: listingType[]): ReactNode[] => {
    return listings.map((listing) => {
      return (
        <Fragment key={listing._id}>
          <hr className="border-t border-gray-200" />
          <ListingCard listing={listing} />
        </Fragment>
      );
    });
  };

  return (
    <ul className="flex flex-col gap-4">
      {makeListOfListings(listings.listings as listingType[])}
    </ul>
  );
}

export default ListOfListings;
