// import { listings } from "../../../data/listings.json";
// import { formatFeedbackPercentage, limitString } from "../../../utils/format";
// import Button from "../../../components/ui/Button";
// import { Link } from "react-router-dom";

// const listingsArray: listingType[] = [];

// listings.forEach((listing) => {
//   listingsArray.push(listing as listingType);
// });

function OffersItems() {
  return (
    <div className="flex flex-col gap-6 my-10">
      {/* {listingsArray.map((listing) => (
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
          <div className="flex flex-col gap-2 col-span-4">
            <p className="text-lg text-green-800 uppercase">offer sent</p>
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
            <p className="text-red-600">Quantity remaining: 2</p>
          </div>
          <div className="col-span-3 text-gray-300 flex flex-col gap-2">
            <div className="flex md:flex-col gap-1 md:gap-0">
              <p>Offer expires in</p>
              <p className="text-red-600 font-medium ">23h 59m</p>
              <p className="">Tomorrow, 00.51</p>
            </div>
            <div className="flex md:block gap-1 items-center">
              <p className="text-lg font-medium text-gray-600">LKR 23000</p>
              <p>Your offer</p>
            </div>
            <div className="flex md:block gap-1 items-center">
              <p className="line-through text-lg font-medium text-gray-300">
                LKR 25000
              </p>
              <p>Original price</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 col-span-3">
            <Button
              intent="primary"
              size="medium"
              className="w-full rounded-full"
            >
              Send another offer
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
      ))} */}
    </div>
  );
}

export default OffersItems;
