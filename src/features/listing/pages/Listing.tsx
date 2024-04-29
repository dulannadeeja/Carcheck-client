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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetListingQuery } from "../clientListingApi";
import { GetListingType, ListingState, ListingType } from "../clientListing";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import CreateBidModel from "../bidding/components/CreateBidModel";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function Listing() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isBidModelOpen, setIsBidModelOpen] = useState(false);
  const [listingData, setListingData] = useState<GetListingType | null>(null);
  const { data, isLoading, isSuccess } = useGetListingQuery(id as string);

  const onCloseBidModel = () => {
    setIsBidModelOpen(false);
  };

  useEffect(() => {
    // navigate back to the previous page if the listing is not found
    if (!id) {
      navigate(-1);
    }
  });

  useEffect(() => {
    setListingData((data?.data as GetListingType) || null);
  }, [data, isSuccess]);

  // Function to calculate and format the end date
  const getEndDate = () => {
    if (!listingData || !listingData.endDate) {
      return <span>Unknown end date</span>;
    }
    return format(new Date(listingData.endDate), "PPPP 'at' p");
  };

  const genarateTheNoticeForTheListing = () => {
    // not logged in user
    if (!user) {
      return (
        <p className="text-sm text-red-300 bg-red-50 border-red-300 border px-10 py-2 rounded-md">
          This listing is ended on {getEndDate()}, you can no longer buy it now
          or make offers.
        </p>
      );
    }

    let isBidder = false;
    const isMaxBidder = listingData?.auction.maxBidder === user?._id;
    const state = listingData?.status;
    const type = listingData?.listingType;
    listingData?.auction.bids.forEach((bid) => {
      if (bid.bidder === user?._id) {
        isBidder = true;
      }
    });

    // if the listing is fixed price and the listing is ended show the listing is ended
    if (state !== ListingState.active && type === ListingType.fixedPrice) {
      return (
        <p className="text-sm text-red-300 bg-red-50 border-red-300 border px-10 py-2 rounded-md">
          This listing is ended on {getEndDate()}, you can no longer buy it now
          or make offers.
        </p>
      );
    }

    if (state === ListingState.active && isBidder) {
      if (isMaxBidder) {
        return (
          <p className="text-sm text-green-500 bg-green-50 border-green-500 border px-10 py-2 rounded-md">
            Keep eye on this listing, your bid{" "}
            {formatCurrency(listingData?.auction.maxBid as number, "LKR")} is
            the highest.
          </p>
        );
      }
      return (
        <p className="text-sm text-red-300 bg-red-50 border-red-300 border px-10 py-2 rounded-md">
          You are not the highest bidder, the highest bid is{" "}
          {formatCurrency(listingData?.auction.maxBid as number, "LKR")}.
        </p>
      );
    }

    if (state !== ListingState.active && isBidder) {
      if (isMaxBidder) {
        return (
          <p className="text-sm text-green-500 bg-green-50 border-green-500 border px-10 py-2 rounded-md">
            Congratulations! You have won the listing with your bid{" "}
            {formatCurrency(listingData?.auction.maxBid as number, "LKR")}.
          </p>
        );
      }
      return (
        <p className="text-sm text-red-300 bg-red-50 border-red-300 border px-10 py-2 rounded-md">
          You have lost the listing, the highest bid is{" "}
          {formatCurrency(listingData?.auction.maxBid as number, "LKR")}.
        </p>
      );
    }

    if (state !== ListingState.active) {
      return (
        <p className="text-sm text-red-300 bg-red-50 border-red-300 border px-10 py-2 rounded-md">
          This listing is ended on {getEndDate()}, you can no longer buy it now
          or make offers.
        </p>
      );
    }
  };

  const calDeposite = (price: number) => {
    // cal 10% of the price
    let deposite = price * 0.1;
    // remove decimal points
    deposite = Math.floor(deposite);
    // ceil to the nearest 1000
    deposite = Math.ceil(deposite / 1000) * 1000;
    return deposite;
  };

  return (
    <>
      <div className="h-full overflow-y-scroll overflow-x-hidden">
        <HeaderContextProvider>
          <Header />
        </HeaderContextProvider>
        {/* add a new bid model */}
        {isBidModelOpen && (
          <CreateBidModel onClose={onCloseBidModel} listingId={id as string} />
        )}
        <Container>
          <main>
            {isLoading && <p>Loading...</p>}
            {isSuccess && listingData && (
              <>
                <div>{genarateTheNoticeForTheListing()}</div>
                <section className="flex justify-between items-center mt-5 md:mt-8">
                  <div className="flex gap-4">
                    <Button
                      intent="iconText"
                      size="none"
                      className="text-gray-600 items-center hover:text-gray-300"
                      onClick={() => {
                        navigate(-1);
                      }}
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
                <section className="md:grid grid-cols-12 gap-10 mt-10">
                  {/* ---------------------------------------------------------Image viewer--------------------------------------------------------- */}
                  <div className="col-span-7">
                    <ImagesViewer images={listingData.images} />
                  </div>
                  <div className="col-span-5 flex flex-col gap-3">
                    {/* ---------------------------------------------------------Title--------------------------------------------------------- */}
                    <h2 className="text-2xl font-semibold text-wrap overflow-hidden break-words">
                      {listingData.title}
                    </h2>
                    {/* ---------------------------------------------------------Seller Info--------------------------------------------------------- */}
                    <div className="py-3 px-3 border border-gray-150 border-solid rounded-lg mt-2 flex gap-4 items-center">
                      <div className="w-[2rem]">
                        <img src={profilePlaceholder} alt="profile" />
                      </div>
                      <div className="flex flex-col">
                        <p>
                          <span className="font-medium underline">
                            {listingData.seller.firstName}{" "}
                            {listingData.seller.lastName}
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
                    {/* ---------------------------------------------------------Auction Info--------------------------------------------------------- */}
                    {listingData.listingType === ListingType.auction && (
                      <div className="mt-2">
                        <h3 className="text-2xl font-medium">
                          {listingData.currentPrice &&
                            formatCurrency(listingData.currentPrice as number)}
                        </h3>
                        <p className="">
                          <Link
                            to={`/viewbids/${listingData._id}`}
                            className="text-blue-300 underline"
                          >
                            {listingData.auction.bids.length} bids ·{" "}
                          </Link>
                          <span className="text-gray-300">
                            {listingData.endDate
                              ? formatTimeLeft(new Date(listingData.endDate))
                              : "Unknown end date"}
                          </span>
                        </p>
                      </div>
                    )}
                    {/* ---------------------------------------------------------Fixed Info--------------------------------------------------------- */}
                    {listingData.listingType === ListingType.fixedPrice && (
                      <div className="mt-2">
                        <h3 className="text-2xl font-medium">
                          {formatCurrency(listingData.currentPrice as number)}
                        </h3>
                        <p className="text-gray-300">Buy it now</p>
                        <p>
                          Immediate payment of LKR{" "}
                          {calDeposite(listingData.currentPrice)} is required.
                        </p>
                      </div>
                    )}

                    {/* condition */}
                    <p>
                      Condition:{" "}
                      <span className="font-medium">
                        {listingData.condition}
                      </span>
                    </p>
                    {/* actions */}
                    <div className="flex gap-4 flex-col">
                      {listingData.listingType === ListingType.auction && (
                        <Button
                          intent="primary"
                          size="large"
                          className="w-full font-medium rounded-full"
                          onClick={() => setIsBidModelOpen(true)}
                        >
                          Place Bid
                        </Button>
                      )}
                      {listingData.listingType === ListingType.fixedPrice && (
                        <Button
                          intent="primary"
                          size="large"
                          className="w-full font-medium rounded-full"
                        >
                          Buy It Now
                        </Button>
                      )}
                      {listingData.isAllowedOffer && (
                        <Button
                          intent="secondary"
                          size="large"
                          className="w-full font-medium rounded-full"
                        >
                          Make Offer
                        </Button>
                      )}
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
                          <span>{listingData.location.city},</span>{" "}
                          <span>{listingData.location.division}</span>
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
                      description={listingData.description}
                      images={listingData.images}
                      itemSpecs={[
                        {
                          name: "Make",
                          value: listingData.make,
                        },
                        {
                          name: "Model",
                          value: listingData.vehicleModel,
                        },
                        {
                          name: "Manufactured Year",
                          value: listingData.manufacturedYear,
                        },
                        {
                          name: "Registered Year",
                          value: listingData.registeredYear,
                        },
                        {
                          name: "Mileage(km)",
                          value: listingData.mileage,
                        },
                        {
                          name: "Transmission",
                          value: listingData.transmission,
                        },
                        {
                          name: "Fuel Type",
                          value: listingData.fuelType,
                        },
                        {
                          name: "Engine Capacity(cc)",
                          value: listingData.engineCapacity,
                        },
                        {
                          name: "Exterior Color",
                          value: listingData.exteriorColor,
                        },
                        {
                          name: "Interior Color",
                          value: listingData.interiorColor,
                        },
                        {
                          name: "Number of Doors",
                          value: listingData.numberOfDoors,
                        },
                        {
                          name: "Number of Seats",
                          value: listingData.numberOfSeats,
                        },
                        {
                          name: "Condition",
                          value: listingData.condition,
                        },
                        {
                          name: "Drive Type",
                          value: listingData.driveType,
                        },
                        {
                          name: "Body Type",
                          value: listingData.bodyType,
                        },
                        {
                          name: "Number of Previous Owners",
                          value: listingData.numberOfPreviousOwners,
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
