import Button from "../../../components/ui/Button";
import RecentlyViewedItems from "./RecentlyViewedItems";

function RecentlyViewed() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-medium">Recently Viewed</h3>
        <Button
          intent="iconText"
          className="rounded-full border border-solid border-blue-300 px-5 py-2 hover:bg-gray-100 flex items-center justify-center"
        >
          <span className="text-blue-300">Clear all</span>
        </Button>
      </div>
      <div>
        <RecentlyViewedItems />
      </div>
    </div>
  );
}

export default RecentlyViewed;
