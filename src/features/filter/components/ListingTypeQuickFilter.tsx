import Button from "../../../components/ui/Button";

function ListingTypeQuickFilter() {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-full justify-between gap-2 p-1 hidden md:inline-flex">
      <Button
        intent="iconText"
        size="none"
        className="text-gray-600 bg-gray-200 px-4 py-1 rounded-full hover:bg-gray-150"
      >
        All
      </Button>
      <Button
        intent="iconText"
        size="none"
        className="text-gray-600 px-4 py-1 rounded-full hover:bg-gray-150"
      >
        Auction
      </Button>
      <Button
        intent="iconText"
        size="none"
        className="text-gray-600 px-4 py-1 rounded-full hover:bg-gray-150"
      >
        Buy it Now
      </Button>
    </div>
  );
}

export default ListingTypeQuickFilter;
