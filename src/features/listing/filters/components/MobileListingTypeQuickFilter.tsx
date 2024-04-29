import Button from "../../../../components/ui/Button";

function MobileListingTypeQuickFilter() {
  return (
    <div className="md:hidden grid grid-cols-3 pb-2">
      <Button
        intent="iconText"
        size="none"
        className="flex justify-center relative font-medium text-blue-300 after:content-[''] after:absolute after:-bottom-2 after:rounded-full after:left-0 after:border-[0.09rem] after:w-full after:border-blue-300"
      >
        All
      </Button>
      <Button
        intent="iconText"
        size="none"
        className="text-gray-600 flex justify-center"
      >
        Auction
      </Button>
      <Button
        intent="iconText"
        size="none"
        className="text-gray-600 flex justify-center"
      >
        Buy it Now
      </Button>
    </div>
  );
}

export default MobileListingTypeQuickFilter;
