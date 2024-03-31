import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import Input from "../../../components/ui/Input";
import { cn } from "../../../utils/mergeClasses";

const formatOptions = ["Auction", "Buy it now/Fixed Price"];
const auctionDurationOptions = ["7 days", "10 days"];

type Format = (typeof formatOptions)[number];
type AuctionDuration = (typeof auctionDurationOptions)[number];

function ListingFormatAndPricing() {
  const [selectedFormat, setSelectedFormat] = useState<Format>(
    formatOptions[0]
  );
  const [selectedAuctionDuration, setSelectedAuctionDuration] =
    useState<AuctionDuration>(auctionDurationOptions[0]);
  const [selectedPricing, setSelectedPricing] = useState(0);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showAuctionDurationDropdown, setShowAuctionDurationDropdown] =
    useState(false);
  const [isAllowOffer, setIsAllowOffer] = useState(false);
  return (
    <div>
      <h3 className="text-lg uppercase font-medium my-4">
        Listing Format & Pricing
      </h3>
      <div className="mt-6">
        <p className="text-sm font-medium mb-2">Format</p>
        <div className="relative">
          <div
            className="flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100 cursor-pointer"
            onClick={() => setShowFormatDropdown(!showFormatDropdown)}
          >
            <p>{selectedFormat}</p>
            <IoChevronDownOutline className="text-base" />
          </div>
          {showFormatDropdown && (
            <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto mt-1">
              {formatOptions.map((format) => (
                <p
                  key={format}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                  onClick={() => {
                    setSelectedFormat(format);
                    setShowFormatDropdown(false);
                  }}
                >
                  {format}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedFormat === formatOptions[1] && (
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">Price</p>
          <Input
            type="number"
            value={selectedPricing}
            onChange={(e) => setSelectedPricing(Number(e.target.value))}
            className="border border-gray-200 rounded-md p-2 w-full"
            placeholder="Enter price"
          />
        </div>
      )}
      {selectedFormat === formatOptions[0] && (
        <div className="mt-6">
          <div>
            <p className="text-sm font-medium mb-2">Auction duration</p>
            <div className="relative">
              <div
                className="flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-100 cursor-pointer"
                onClick={() =>
                  setShowAuctionDurationDropdown(!showAuctionDurationDropdown)
                }
              >
                <p>{selectedAuctionDuration}</p>
                <IoChevronDownOutline className="text-base" />
              </div>
              {showAuctionDurationDropdown && (
                <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto mt-1">
                  {auctionDurationOptions.map((duration) => (
                    <p
                      key={duration}
                      className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                      onClick={() => {
                        setSelectedAuctionDuration(duration);
                        setShowAuctionDurationDropdown(false);
                      }}
                    >
                      {duration}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <div>
              <p className="font-medium">
                Starting bid
                <span className="font-normal text-gray-300">(optional)</span>
              </p>
              <label className="max-w-48 border border-gray-150 flex items-center p-2 rounded-md bg-gray-50">
                <span className="text-gray-300 font-medium">LKR</span>
                <Input
                  type="number"
                  className="border-none rounded-md p-0 pl-3 focus:outline-none"
                />
              </label>
            </div>
            <div>
              <p className="font-medium">
                Reserve price
                <span className="font-normal text-gray-300">(optional)</span>
              </p>
              <label className="max-w-48 border border-gray-150 flex items-center p-2 rounded-md bg-gray-50">
                <span className="text-gray-300 font-medium">LKR</span>
                <Input
                  type="number"
                  className="border-none rounded-md p-0 pl-3 focus:outline-none"
                />
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="mt-6 border-gray-150 border p-4 rounded-md">
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
            onClick={() => setIsAllowOffer(!isAllowOffer)}
          >
            <div
              className={cn(
                "bg-white w-6 h-6 rounded-full shadow-md absolute top-0 transition-transform duration-300 ease-in-out",
                {
                  "left-0": !isAllowOffer,
                  "translate-x-6": isAllowOffer,
                }
              )}
            ></div>
          </div>
        </div>
        {isAllowOffer && (
          <div className="gap-5 w-[50%] md:flex md:w-full">
            <div>
              <p className="font-medium">
                Minimum offer{" "}
                <span className="font-normal text-gray-300">(optional)</span>
              </p>
              <p className="text-gray-300 pb-2">
                Enter the minimum offer you're willing to accept for your item.
              </p>
              <label className="max-w-48 border border-gray-150 flex items-center p-2 rounded-md bg-gray-50">
                <span className="text-gray-300 font-medium">LKR</span>
                <Input
                  type="number"
                  className="border-none rounded-md p-0 pl-3 focus:outline-none"
                />
              </label>
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
              <label className="max-w-48 border border-gray-150 flex items-center p-2 rounded-md bg-gray-50">
                <span className="text-gray-300 font-medium">LKR</span>
                <Input
                  type="number"
                  className="border-none rounded-md p-0 pl-3 focus:outline-none"
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingFormatAndPricing;
