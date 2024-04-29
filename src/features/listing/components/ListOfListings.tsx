import { useSelector } from "react-redux";
import { GetListingType} from "../clientListing";
import ListingCard from "./ListingCard";
import { Fragment, ReactNode } from "react";
import { RootState } from "../../../store/store";

function ListOfListings() {
  const {listings} = useSelector((state: RootState) => state.clientListing);
  const makeListOfListings = (listings: GetListingType[]): ReactNode[] => {
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
      {
        listings.length > 0 && makeListOfListings(listings)
      }
    </ul>
  );
}

export default ListOfListings;
