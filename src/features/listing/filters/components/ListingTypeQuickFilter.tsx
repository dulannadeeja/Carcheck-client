import Button from "../../../../components/ui/Button";
import { ListingType } from "../../clientListing";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setFilterOptions, setIsNeedToUpdateURL } from "../../clientListingSlice";
import { cn } from "../../../../utils/mergeClasses";

function ListingTypeQuickFilter() {
  const dispatch = useDispatch();
  const {filterOptions} = useSelector((state: RootState) => state.clientListing);

  const onChangeListingType = (type: ListingType | "") => {
    dispatch(setIsNeedToUpdateURL(true));
    dispatch(setFilterOptions({
      ...filterOptions,
      listingType: type
    }))
  }

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-full justify-between gap-2 p-1 hidden md:inline-flex">
      <Button
        intent="iconText"
        size="none"
        className={cn("text-gray-600 px-4 py-1 rounded-full hover:bg-gray-150",{
          "bg-gray-200" : filterOptions.listingType === ""
        })}
        onClick={() => onChangeListingType("")}
      >
        All
      </Button>
      <Button
        intent="iconText"
        size="none"
        className={cn("text-gray-600 px-4 py-1 rounded-full hover:bg-gray-150",{
          "bg-gray-200" : filterOptions.listingType === ListingType.auction
        })}
        onClick={() => onChangeListingType(ListingType.auction)}
      >
        Auction
      </Button>
      <Button
        intent="iconText"
        size="none"
        className={cn("text-gray-600 px-4 py-1 rounded-full hover:bg-gray-150",{
          "bg-gray-200" : filterOptions.listingType === ListingType.fixedPrice
        })}
        onClick={() => onChangeListingType(ListingType.fixedPrice)}
      >
        Buy it Now
      </Button>
    </div>
  );
}

export default ListingTypeQuickFilter;
