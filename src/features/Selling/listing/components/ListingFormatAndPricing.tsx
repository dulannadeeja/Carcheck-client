import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import Input from "../../../../components/ui/Input";
import { cn } from "../../../../utils/mergeClasses";
import {
  auctionDurationOptionsArray,
  ListingType,
  listingTypeArray,
} from "../../../listing/clientListing";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuction,
  clearOffer,
  updateAndValidateFieldHandler,
} from "../listingSlice";

function ListingFormatAndPricing() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector((state: RootState) => state.listing);
  const { listingType, auction, fixedPrice, isAllowedOffer, offer } = data;

  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showAuctionDurationDropdown, setShowAuctionDurationDropdown] =
    useState(false);

  const handleChange = (field: string, value: number) => {
    if (isNaN(value as number) || value === 0) {
      dispatch(updateAndValidateFieldHandler({ field, value: 0 }));
      return;
    }
    dispatch(updateAndValidateFieldHandler({ field, value }));
  };

  const handleListingTypeChange = (value: string) => {
    dispatch(updateAndValidateFieldHandler({ field: "listingType", value }));
    if (value === ListingType.fixedPrice) {
      dispatch(clearAuction());
    }else{
      dispatch(updateAndValidateFieldHandler({field: "fixedPrice", value: 0}));
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-lg uppercase font-medium">
        Listing Format & Pricing
      </h3>
      <div className="">
        <p className="text-sm font-medium mb-2">Format</p>
        <div className="relative">
          <div
            className="flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10 cursor-pointer"
            onClick={() => setShowFormatDropdown(!showFormatDropdown)}
          >
            <p>{listingType}</p>
            <IoChevronDownOutline className="text-base" />
          </div>
          {showFormatDropdown && (
            <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto mt-1">
              {listingTypeArray.map((format) => (
                <p
                  key={format}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                  onClick={() => {
                    handleListingTypeChange(format);
                    setShowFormatDropdown(false);
                  }}
                >
                  {format}
                </p>
              ))}
            </div>
          )}
        </div>
        {errors.listingType && (
          <p className="text-red-300 text-sm mt-1">{errors.listingType}</p>
        )}
      </div>
      {listingType === ListingType.fixedPrice && (
        <div className="">
          <p className="text-sm font-medium mb-2">Price</p>
          <label className="max-w-48 border border-gray-150 flex items-center p-2 rounded-md bg-gray-50">
            <span className="text-gray-300 font-medium">LKR</span>
            <Input
              type="number"
              className="border-none rounded-md p-0 pl-3 focus:outline-none"
              onChange={(e) => {
                handleChange("fixedPrice", parseInt(e.target.value));
              }}
              value={fixedPrice === 0 ? "" : fixedPrice}
            />
          </label>
          {errors.fixedPrice && (
            <p className="text-red-300 text-sm mt-1">{errors.fixedPrice}</p>
          )}
        </div>
      )}
      {listingType === ListingType.auction && (
        <div className="flex gap-20 justify-between">
          <div className="">
            <p className="text-sm font-medium mb-2">Auction duration</p>
            <div className="relative">
              <div
                className="flex w-48 h-10 justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 cursor-pointer"
                onClick={() =>
                  setShowAuctionDurationDropdown(!showAuctionDurationDropdown)
                }
              >
                <p>{auction?.duration === 0 ? "" : auction?.duration}</p>
                <IoChevronDownOutline className="text-base" />
              </div>
              {showAuctionDurationDropdown && (
                <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto mt-1">
                  {auctionDurationOptionsArray.map((duration) => (
                    <p
                      key={duration.name}
                      className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                      onClick={() => {
                        handleChange("auction.duration", duration.value);
                        setShowAuctionDurationDropdown(false);
                      }}
                    >
                      {duration.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {errors.auction?.duration && (
              <p className="text-red-300 text-sm mt-1">
                {errors.auction?.duration}
              </p>
            )}
          </div>
          <div className="flex gap-10">
            <div>
              <p className="font-medium mb-2">
                Starting bid{" "}
                <span className="font-normal text-gray-300"> (required)</span>
              </p>
              <label className="max-w-48 border border-gray-150 flex items-center p-2 rounded-md bg-gray-50 h-10">
                <span className="text-gray-300 font-medium">LKR</span>
                <Input
                  type="number"
                  className="border-none rounded-md p-0 pl-3 focus:outline-none"
                  onChange={(e) => {
                    handleChange(
                      "auction.startingBid",
                      parseInt(e.target.value)
                    );
                  }}
                  value={auction?.startingBid === 0 ? "" : auction?.startingBid}
                />
              </label>
              {errors.auction?.startingBid && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.auction?.startingBid}
                </p>
              )}
            </div>
            <div>
              <p className="font-medium mb-2">
                Reserve price{" "}
                <span className="font-normal text-gray-300"> (optional)</span>
              </p>
              <label className="max-w-48 border border-gray-150 flex items-center p-2 rounded-md bg-gray-50 h-10">
                <span className="text-gray-300 font-medium">LKR</span>
                <Input
                  value={
                    auction?.reservePrice === 0 ? "" : auction?.reservePrice
                  }
                  type="number"
                  className="border-none rounded-md p-0 pl-3 focus:outline-none"
                  onChange={(e) => {
                    handleChange(
                      "auction.reservePrice",
                      parseInt(e.target.value)
                    );
                  }}
                />
              </label>
              {errors.auction?.reservePrice && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.auction?.reservePrice}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="border-gray-150 border p-4 flex flex-col gap-3 rounded-md">
        <div className="flex justify-between items-center  ">
          <div className="mb-5">
            <p className="text-base font-medium">Allow offers</p>
            <p className="text-gray-300">
              Buyers interested in your item can make you offers -- you can
              accept, counter or decline.
            </p>
          </div>
          {/* toggle button */}
          <div
            className="bg-blue-300 rounded-full h-6 w-12 relative overflow-hidden cursor-pointer"
            onClick={() => {
              dispatch(
                updateAndValidateFieldHandler({
                  field: "isAllowedOffer",
                  value: !isAllowedOffer,
                })
              );
              if (isAllowedOffer) {
                dispatch(clearOffer());
              }
            }}
          >
            <div
              className={cn(
                "bg-white w-6 h-6 rounded-full shadow-md absolute top-0 transition-transform duration-300 ease-in-out",
                {
                  "left-0": !isAllowedOffer,
                  "translate-x-6": isAllowedOffer,
                }
              )}
            ></div>
          </div>
        </div>
        {isAllowedOffer && (
          <div className="gap-5 w-[50%] md:flex md:w-full">
            <div>
              <p className="font-medium">
                Minimum offer{" "}
                <span className="font-normal text-gray-300">(optional)</span>
              </p>
              <p className="text-gray-300 pb-2">
                Enter the minimum offer you're willing to accept for your item.
              </p>
              <label className="max-w-48 border border-gray-150 flex items-center p-2 rounded-md bg-gray-50 h-10">
                <span className="text-gray-300 font-medium">LKR</span>
                <Input
                  value={offer?.minimumOffer === 0 ? "" : offer?.minimumOffer}
                  onChange={(e) =>
                    handleChange("offer.minimumOffer", parseInt(e.target.value))
                  }
                  type="number"
                  className="border-none rounded-md p-0 pl-3 focus:outline-none"
                />
              </label>
              {errors.offer?.minimumOffer && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.offer?.minimumOffer}
                </p>
              )}
            </div>
            <div>
              <p className="font-medium">
                Auto-accept price{" "}
                <span className="font-normal text-gray-300">(optional)</span>
              </p>
              <p className="text-gray-300 pb-2">
                Enter the price at which you'd like to automatically accept
                offers.
              </p>
              <label className="max-w-48 border border-gray-150 flex items-center p-2 rounded-md bg-gray-50 h-10">
                <span className="text-gray-300 font-medium">LKR</span>
                <Input
                  value={
                    offer?.autoAcceptOffer === 0 ? "" : offer?.autoAcceptOffer
                  }
                  onChange={(e) =>
                    handleChange(
                      "offer.autoAcceptOffer",
                      parseInt(e.target.value)
                    )
                  }
                  type="number"
                  className="border-none rounded-md p-0 pl-3 focus:outline-none"
                />
              </label>
              {errors.offer?.autoAcceptOffer && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.offer?.autoAcceptOffer}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingFormatAndPricing;
