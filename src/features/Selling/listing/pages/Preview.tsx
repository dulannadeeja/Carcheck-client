import Container from "../../../../components/ui/Container";
import HeaderContextProvider from "../../../../context/headerContextProvider";
import Header from "../../../../layouts/Header";
import ImagesViewer from "../../../listing/components/ImagesViewer";
import { GetDraftListingType, ListingTypes } from "../sellerListing";
import profilePlaceholder from "../../../../assets/placeholders/user-profile-placeholder-1.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  formatCurrency,
  formatFeedbackPercentage,
  formatTimeLeft,
} from "../../../../utils/format";
import { Link } from "react-router-dom";
import Button from "../../../../components/ui/Button";
import verifiedSvg from "../../../../assets/svg/verifiedBadge.svg";
import AboutThisItem from "../../../listing/components/AboutThisItem";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoMdShare } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { add } from "date-fns";

function Preview({
  listingData,
  onClose,
}: {
  listingData: GetDraftListingType;
  onClose: () => void;
}) {
  const { user } = useSelector((state: RootState) => state.auth);

  const calDeposite = (price: number) => {
    // cal 10% of the price
    let deposite = price * 0.1;
    // remove decimal points
    deposite = Math.floor(deposite);
    // ceil to the nearest 1000
    deposite = Math.ceil(deposite / 1000) * 1000;
    return deposite;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-screen w-full z-[50] flex items-center justify-center"
      id="my-modal"
    >
      <div className="relative p-5 border w-[90%] h-[90%] shadow-lg rounded-md bg-white z-[100] overflow-hidden">
        <div className="flex justify-between mb-5">
          <h2 className="text-xl font-medium">Preview</h2>
          <Button
            intent="iconRound"
            size="none"
            className="bg-gray-100 text-xl p-3 hover:bg-gray-50"
            onClick={onClose}
          >
            {" "}
            <RxCross1 />
          </Button>
        </div>
        <div className="overflow-y-scroll h-[90%] w-full overflow-x-hidden">
          <div className="h-full w-full pointer-events-none">
            <HeaderContextProvider>
              <Header />
            </HeaderContextProvider>
            <Container>
              <main className="w-full">
                <p className="text-red-300">
                  This is only a preview of the listing, please fill out all the
                  required fields and submit the listing to make it live.
                </p>
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
                <section className="grid grid-cols-12 gap-10 mt-8">
                  <div className="col-span-7">
                    <ImagesViewer
                      images={listingData.images ? listingData.images : []}
                    />
                  </div>
                  <div className="col-span-5 flex flex-col gap-3">
                    {/* _______________________________________Title______________________________________________________ */}
                    <h2 className="text-2xl font-semibold break-words overflow-hidden">
                      {listingData?.title}
                    </h2>
                    {/* _______________________________________Seller Info______________________________________________________ */}
                    <div className="py-3 px-3 border border-gray-150 border-solid rounded-lg flex gap-4 items-center">
                      <div className="w-[2rem]">
                        <img src={profilePlaceholder} alt="profile" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p>
                          <span className="font-medium underline">
                            {user?.firstName} {user?.lastName}
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
                    {/* _______________________________________Auction______________________________________________________ */}
                    <div className="">
                      <h3 className="text-2xl font-medium">
                        {listingData.listingType === ListingTypes.auction &&
                          listingData.auction &&
                          listingData.auction.startingBid &&
                          formatCurrency(
                            listingData.auction.startingBid as number,
                            "LKR"
                          )}
                      </h3>
                      {listingData.listingType === ListingTypes.auction && (
                        <p className="">
                          <Link
                            to={`/viewbids/${listingData._id}`}
                            className="text-blue-300 underline"
                          >
                            0 bids ·{" "}
                          </Link>
                          <span className="text-gray-300">
                            {listingData.auction && listingData.auction.duration
                              ? formatTimeLeft(
                                  add(new Date(), {
                                    days: listingData.auction.duration,
                                  })
                                )
                              : "Unknown end date"}
                          </span>
                        </p>
                      )}
                    </div>
                    {/* _______________________________________Fixed______________________________________________________ */}
                    <div className="">
                      <h3 className="text-2xl font-medium">
                        {listingData.listingType === ListingTypes.fixedPrice && listingData.fixedPrice &&
                          formatCurrency(listingData.fixedPrice as number, "LKR")}
                      </h3>
                      <p className="text-gray-300">Buy it now</p>
                      <p>
                        Immediate payment of LKR{" "}
                        {listingData.listingType === ListingTypes.fixedPrice && listingData.fixedPrice && calDeposite(listingData.fixedPrice as number)}{" "}
                        is required.
                      </p>
                    </div>
                    {/* condition */}
                    <p>
                      Condition:{" "}
                      <span className="font-medium">
                        {listingData?.condition}
                      </span>
                    </p>
                    {/* actions */}
                    <div className="flex gap-4 flex-col">
                      {!listingData.listingType ||
                        (listingData.listingType === ListingTypes.auction && (
                          <Button
                            intent="primary"
                            size="large"
                            className="w-full font-medium rounded-full"
                          >
                            Place Bid
                          </Button>
                        ))}
                      {!listingData.listingType ||
                        (listingData.listingType ===
                          ListingTypes.fixedPrice && (
                          <Button
                            intent="primary"
                            size="large"
                            className="w-full font-medium rounded-full"
                          >
                            Buy It Now
                          </Button>
                        ))}
                      {!listingData.listingType ||
                        (listingData.listingType === ListingTypes.fixedPrice &&
                          listingData.isAllowedOffer && (
                            <Button
                              intent="secondary"
                              size="large"
                              className="w-full font-medium rounded-full"
                            >
                              Make Offer
                            </Button>
                          ))}
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
                          <span>
                            {listingData.location && listingData.location.city},
                          </span>{" "}
                          <span>
                            {listingData.location &&
                              listingData.location.division}
                          </span>
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
                        Deposit, Returns & Carcheck Guarantee
                      </Button>
                    </div>
                    <p className="underline">Report this item</p>
                  </div>
                  <div className="p-4 border border-gray-150">
                    <AboutThisItem
                      description={listingData?.description || ""}
                      images={listingData?.images || []}
                      itemSpecs={[
                        {
                          name: "Make",
                          value: listingData?.make || "",
                        },
                        {
                          name: "Model",
                          value: listingData?.vehicleModel || "",
                        },
                        {
                          name: "Manufactured Year",
                          value: listingData?.manufacturedYear || "",
                        },
                        {
                          name: "Registered Year",
                          value: listingData?.registeredYear || "",
                        },
                        {
                          name: "Mileage(km)",
                          value: listingData?.mileage || "",
                        },
                        {
                          name: "Transmission",
                          value: listingData?.transmission || "",
                        },
                        {
                          name: "Fuel Type",
                          value: listingData?.fuelType || "",
                        },
                        {
                          name: "Engine Capacity(cc)",
                          value: listingData?.engineCapacity || "",
                        },
                        {
                          name: "Exterior Color",
                          value: listingData?.exteriorColor || "",
                        },
                        {
                          name: "Interior Color",
                          value: listingData?.interiorColor || "",
                        },
                        {
                          name: "Number of Doors",
                          value: listingData?.numberOfDoors || "",
                        },
                        {
                          name: "Number of Seats",
                          value: listingData?.numberOfSeats || "",
                        },
                        {
                          name: "Condition",
                          value: listingData?.condition || "",
                        },
                        {
                          name: "Drive Type",
                          value: listingData?.driveType || "",
                        },
                        {
                          name: "Body Type",
                          value: listingData?.bodyType || "",
                        },
                        {
                          name: "Number of Previous Owners",
                          value: listingData?.numberOfPreviousOwners || "",
                        },
                      ]}
                    />
                  </div>
                </section>
              </main>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
