

import {
    limitString,
  } from "../../../utils/format";
  import Button from "../../../components/ui/Button";
  import { useGetDraftsQuery } from "../SellerApiSlice";
  import { SERVER_URL } from "../../../utils/constants";
  
  
  
  function ActiveItems() {
      const { data, error, isLoading } = useGetDraftsQuery();
      
    return (
      <div className="flex flex-col gap-6 my-10">
        {data?.map((listing) => (
          <div
            key={listing._id}
            className="text-sm flex flex-col md:grid grid-cols-8 gap-6 border p-4 rounded-lg shadow-sm md:border-none md:shadow-none"
          >
            <div className="bg-gray-100 shadow-sm rounded-lg aspect-square overflow-hidden col-span-1 w-full max-w-[10rem] md:max-w-full">
              <img
                src={`${SERVER_URL}/images/${listing.images[0]}`}
                alt="listing image"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-1 col-span-5">
              <h4 className="text-base">{limitString(listing.title, 50)}</h4>
              <p className="text-gray-300">Updated: {listing.updatedAt}</p>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <Button
                intent="secondary"
                size="medium"
                className="w-full rounded-full"
              >
                Resume Draft
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default ActiveItems;
  