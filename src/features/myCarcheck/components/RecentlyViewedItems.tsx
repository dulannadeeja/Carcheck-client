
// import { listings } from "../../../data/listings.json";
// import {
//   formatCurrency,
//   formatTimeLeft,
//   limitString,
// } from "../../../utils/format";

// // const listingsArray: listingType[] = [];

// // listings.forEach((listing) => {
// //   listingsArray.push(listing as listingType);
// // });

function RecentlyViewedItems() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2">
        {/* {listingsArray.map((listing) => (
          <div key={listing._id} className="p-4 text-sm">
            <div className="bg-gray-100 shadow-sm rounded-lg aspect-square">
              <img
                src={listing.images[0]}
                alt="listing image"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-base text-blue-300 mt-2">
                {limitString(listing.title, 50)}
              </h4>
              <p className="text-gray-600 text-lg font-medium">
                {formatCurrency(listing.price, "LKR")}
              </p>
              <p>Free Shipping</p>
              <p>or Best Offer</p>
              <p>Bids ({listing.auction.bidders})</p>
              <p>{formatTimeLeft(new Date(listing.auction.endDateTime))}</p>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default RecentlyViewedItems;
