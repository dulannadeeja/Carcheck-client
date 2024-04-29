import Button from "../../../components/ui/Button";
import { IoMdHeartEmpty } from "react-icons/io";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

function CurrentSearch() {
  const { filterOptions, totalListings } = useSelector(
    (state: RootState) => state.clientListing
  );
  return (
    <>
      {filterOptions.search ? (
        <p className="font-medium hidden md:inline-block">
          {totalListings}+ results for {filterOptions.search}
        </p>
      ) : (
        <p className="font-medium hidden md:inline-block">
          {totalListings}+ results
        </p>
      )}
      <Button intent="iconText" size="none" className="text-blue-300">
        <IoMdHeartEmpty />
        <span className="text-sm">Save this search</span>
      </Button>
    </>
  );
}

export default CurrentSearch;
