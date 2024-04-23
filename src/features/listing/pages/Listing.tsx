import Container from "../../../components/ui/Container";
import HeaderContextProvider from "../../../context/headerContextProvider";
import Header from "../../../layouts/Header";
import Button from "../../../components/ui/Button";
import { IoHeartOutline } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ImagesViewer from "../components/ImagesViewer";
import profilePlaceholder from "../../../assets/images/profile_place_holder.png";
import verifiedSvg from "../../../assets/svg/verifiedBadge.svg";
import {
  formatCurrency,
  formatFeedbackPercentage,
  formatTimeLeft,
} from "../../../utils/format";
import AboutThisItem from "../components/AboutThisItem";
import Input from "../../../components/ui/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useGetListingQuery } from "../../Selling/listing/listingApiSlice";
import { useEffect, useState } from "react";
import { add } from "date-fns";
import PutBidModel from "../components/PutBidModel";

function Listing() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    data: listing,
    isLoading,
    isSuccess,
  } = useGetListingQuery(id as string);
  const [isBidModelOpen, setIsBidModelOpen] = useState(false);

  const onCloseBidModel = () => {
    setIsBidModelOpen(false);
  };

  useEffect(() => {
    // navigate back to the previous page if the listing is not found
    if (!id) {
      navigate(-1);
    }
  });

  return (
    <>
      <div className="h-full overflow-y-scroll overflow-x-hidden">
        <HeaderContextProvider>
          <Header />
        </HeaderContextProvider>
        {/* add a new bid model */}
        <PutBidModel isOpen={true} onClose={onCloseBidModel} />
        <Container>
          <main>
            {isLoading && <p>Loading...</p>}
            {isSuccess && listing && (
              <>
                <section className="flex justify-between items-center mt-5 md:mt-8">
                  <div className="flex gap-4">
                    <Button
                      intent="iconText"
                      size="none"
                      className="text-gray-600 items-center hover:text-gray-300"
                    >
                      <span className="bg-gray-150 p-1 rounded-full flex items-center justify-center">
                        <FiChevronLeft />
                      </span>
                      <span className="underline">Back to home page</span>
                    </Button>
                    <div className="flex gap-2 items-center text-gray-300">
                      <Button
                        intent="iconText"
                        size="none"
                        className="hover:underline"
                      >
                        Vehicles
                      </Button>
                      <FiChevronRight />
                      <Button
                        intent="iconText"
                        size="none"
                        className="hover:underline"
                      >
                        Cars
                      </Button>
                      <FiChevronRight />
                      <Button
                        intent="iconText"
                        size="none"
                        className="hover:underline"
                      >
                        BMW 3-series
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      intent="iconText"
                      size="none"
                      className="text-gray-600"
                    >
                      <IoMdShare />
                      <span>Share</span>
                    </Button>
                    <Button
                      intent="iconText"
                      size="none"
                      className="text-gray-600"
                    >
                      <IoHeartOutline />
                      <span>Add to Watchlist</span>
                    </Button>
                  </div>
                </section>
                <section className="md:flex gap-4 mt-5 md:mt-8">
                  <div className="md:basis-[48%] lg:basis-[60%] shrink-0">
                    <ImagesViewer images={listing.images} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold">{listing.title}</h2>
                    <div className="py-3 px-3 border border-gray-150 border-solid rounded-lg mt-2 flex gap-4 items-center">
                      <div className="w-[2rem]">
                        <img src={profilePlaceholder} alt="profile" />
                      </div>
                      <div className="flex flex-col">
                        <p>
                          <span className="font-medium underline">
                            {listing.seller.firstName} {listing.seller.lastName}
                          </span>{" "}
                          <span className="font-medium text-gray-300">
                            ({10})
                          </span>
                        </p>
                        <div className="flex gap-2">
                          <p className="font-medium underline">
                            {formatFeedbackPercentage(99)} positive
                          </p>
                          <p className="font-medium underline">
                            Seller's other items
                          </p>
                          <p className="font-medium underline">
                            Contact seller
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* bid price */}
                    <div className="mt-2">
                      <h3 className="text-2xl font-medium">
                        {formatCurrency(listing.auction.currentBid, "LKR")}
                      </h3>
                      <p>
                        {listing.auction.bidders} bids ·{" "}
                        <span className="text-gray-300">
                          {formatTimeLeft(
                            new Date(
                              add(new Date(listing.createdAt), {
                                days: listing.auction.duration,
                              })
                            )
                          )}
                        </span>
                      </p>
                    </div>
                    {/* buy it now price */}
                    <div className="mt-2">
                      <h3 className="text-2xl font-medium">
                        {formatCurrency(listing.fixedPrice, "LKR")}
                      </h3>
                      <p className="text-gray-300">Buy it now</p>
                      <p>Immediate payment of LKR 20000 is required.</p>
                    </div>

                    {/* condition */}
                    <p>
                      Condition:{" "}
                      <span className="font-medium">{listing.condition}</span>
                    </p>
                    {/* quantity */}
                    <div className="flex gap-2 items-center">
                      <p>Quantity:</p>
                      <Input
                        type="number"
                        value={1}
                        className="w-fit grow-0 max-w-[4rem]"
                      />
                      <p>
                        <span className="font-medium text-red-300">
                          Last One
                        </span>
                        /<span>1 sold</span>
                      </p>
                    </div>
                    {/* actions */}
                    <div className="flex gap-4 flex-col">
                      <Button
                        intent="primary"
                        size="large"
                        className="w-full font-medium rounded-full"
                      >
                        Place Bid
                      </Button>
                      <Button
                        intent="secondary"
                        size="large"
                        className="w-full font-medium rounded-full"
                      >
                        Buy It Now
                      </Button>
                      <Button
                        intent="secondary"
                        size="large"
                        className="w-full font-medium rounded-full"
                      >
                        Make Offer
                      </Button>
                    </div>
                    {/* inspection */}
                    <div className="flex items-center gap-2 border-b border-b-gray-150 pb-4">
                      <img
                        src={verifiedSvg}
                        alt="verified"
                        className="w-5 h-5"
                      />
                      <p>
                        Inspected and Verified by{" "}
                        <span className="font-medium">AMW.</span>{" "}
                        <span className="underline">Learn more</span>
                      </p>
                    </div>
                    <div className="flex flex-col gap-3">
                      {/* location */}
                      <div className="grid grid-cols-6">
                        <p className="col-span-1">Location:</p>
                        <p className="flex gap-2 font-medium col-span-5">
                          <span>{listing.location.city},</span>{" "}
                          <span>{listing.location.division}</span>
                        </p>
                      </div>
                      {/* shipping */}
                      <div className="grid grid-cols-6">
                        <p className="col-span-1">Shipping:</p>
                        <p className="col-span-5 font-medium text-green-700">
                          Free same day shipping
                        </p>
                      </div>
                      {/* payment */}
                      <div className="grid grid-cols-6">
                        <p className="col-span-1">Payment:</p>
                        <p className="col-span-5 text-gray-300">
                          Full payment is required withing 7 days of listing
                          close
                        </p>
                      </div>
                      {/* return acceptance */}
                      <div className="grid grid-cols-6">
                        <p className="col-span-1">Returns:</p>
                        <p className="col-span-5 text-gray-300">
                          Returns are accepted withing 30 days of delivery
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="w-full mt-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex">
                      <Button
                        intent={"iconText"}
                        size={"none"}
                        className="px-4 py-2 font-medium  rounded-none"
                      >
                        About this item
                      </Button>
                      <Button
                        intent={"iconText"}
                        size={"none"}
                        className="px-4 py-2 font-medium bg-gray-100 rounded-none border border-gray-150 border-solid"
                      >
                        Vehicle inspection report
                      </Button>
                      <Button
                        intent={"iconText"}
                        size={"none"}
                        className="px-4 py-2 font-medium bg-gray-100  rounded-none border border-gray-150 border-solid"
                      >
                        Shipping, returns, and payments
                      </Button>
                    </div>
                    <p className="underline">Report this item</p>
                  </div>
                  <div className="p-4 border border-gray-150">
                    <AboutThisItem
                      description={listing.description}
                      images={listing.images}
                      itemSpecs={[
                        {
                          name: "Make",
                          value: listing.make,
                        },
                        {
                          name: "Model",
                          value: listing.vehicleModel,
                        },
                        {
                          name: "Manufactured Year",
                          value: listing.manufacturedYear,
                        },
                        {
                          name: "Registered Year",
                          value: listing.registeredYear,
                        },
                        {
                          name: "Mileage(km)",
                          value: listing.mileage,
                        },
                        {
                          name: "Transmission",
                          value: listing.transmission,
                        },
                        {
                          name: "Fuel Type",
                          value: listing.fuelType,
                        },
                        {
                          name: "Engine Capacity(cc)",
                          value: listing.engineCapacity,
                        },
                        {
                          name: "Exterior Color",
                          value: listing.exteriorColor,
                        },
                        {
                          name: "Interior Color",
                          value: listing.interiorColor,
                        },
                        {
                          name: "Number of Doors",
                          value: listing.numberOfDoors,
                        },
                        {
                          name: "Number of Seats",
                          value: listing.numberOfSeats,
                        },
                        {
                          name: "Condition",
                          value: listing.condition,
                        },
                        {
                          name: "Drive Type",
                          value: listing.driveType,
                        },
                        {
                          name: "Body Type",
                          value: listing.bodyType,
                        },
                        {
                          name: "Number of Previous Owners",
                          value: listing.numberOfPreviousOwners,
                        },
                      ]}
                    />
                  </div>
                </section>
              </>
            )}
          </main>
        </Container>
      </div>
    </>
  );
}

export default Listing;
