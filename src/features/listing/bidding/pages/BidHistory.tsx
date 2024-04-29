import Button from "../../../../components/ui/Button";
import { IoChevronBackOutline } from "react-icons/io5";
import Header from "../../../../layouts/Header";
import HeaderContextProvider from "../../../../context/headerContextProvider";
import Container from "../../../../components/ui/Container";
import { useGetListingQuery } from "../../clientListingApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../../../../utils/constants";
import { GetListingType, ListingState, ListingType } from "../../clientListing";
import { formatCurrency, formatTimeLeft } from "../../../../utils/format";
import { BidResponseData } from "../bid";
import { add, addDays, format, formatDate } from "date-fns";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import CreateBidModel from "../components/CreateBidModel";

function BidHistory() {
  const navigate = useNavigate();
  const { listingId } = useParams<{ listingId: string }>();
  const [showCreateBid, setShowCreateBid] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, isSuccess } = useGetListingQuery(
    listingId as string
  );
  const [listingData, setListingData] = useState<GetListingType | null>(null);

  useEffect(() => {
    if (!isLoading && isSuccess && data.data) {
        // check bids are present
      setListingData(data?.data);
      console.log(data);
    }else{
        setListingData(null);
    }
    if (!isLoading && !isSuccess) {
      // throw back to the listing page
      navigate("/listing/" + listingId);
    }
  }, [isLoading, isSuccess, data, navigate, listingId]);

  const calBidders = () => {
    const allBids = listingData?.auction.bids;
    const uniqueBidders: BidResponseData[] = [];
    allBids?.forEach((bid) => {
      if (!uniqueBidders.find((b) => b.bidder === bid.bidder)) {
        uniqueBidders.push(bid);
      }
    });
    return uniqueBidders.length;
  };

  const getHiddenBidderName = (bidder: string) => {
    return (
      bidder[0] +
      bidder[1] +
      "***" +
      bidder[bidder.length - 1] +
      bidder[bidder.length - 2]
    );
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

    if(state !== ListingState.active) {
        return (
          <p className="text-sm text-red-300 bg-red-50 border-red-300 border px-10 py-2 rounded-md">
            This listing is ended on {getEndDate()}, you can no longer buy it now
            or make offers.
          </p>
        );
      }
  };

  // Function to calculate and format the end date
  const getEndDate = () => {
    if (
      !listingData ||
      !listingData.auction.startingDate ||
      !listingData.auction.duration
    ) {
      return <span>Unknown end date</span>;
    }
    const endedOn = addDays(
      new Date(listingData.auction.startingDate),
      listingData.auction.duration
    );
    return format(endedOn, "PPPP 'at' p");
  };

  return (
    <div className="h-full overflow-y-scroll">
      <HeaderContextProvider>
        <Header />
      </HeaderContextProvider>
      {isSuccess && listingData && showCreateBid && <CreateBidModel
        onClose={() => setShowCreateBid(false)}
        listingId={listingId as string}
      />}
      <Container>
        {isSuccess && listingData && data.data.auction.bids?.length > 0 &&
         (
          <div className="mt-5">
            <div className="mb-5">{genarateTheNoticeForTheListing()}</div>
            <Button intent={"iconText"} size={"none"} className="mb-5"
                onClick={() => navigate(`/listing/${listingId}`)}
            >
              <span>
                <IoChevronBackOutline />
              </span>
              <span>Back to item description</span>
            </Button>
            <div className="flex items-center gap-5 mt-10">
              <div className="bg-gray-100 shadow-sm rounded-lg aspect-square overflow-hidden w-[7rem]">
                <img
                  src={`${SERVER_URL}/images/${listingData.images[0]}`}
                  alt="listing image"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-medium">{listingData.title}</h3>
            </div>
            <div className="mt-10 max-w-[20rem] flex flex-col gap-2 mb-10">
              <div className="grid grid-cols-12">
                <h4 className="text-gray-400 col-span-5">Current bid:</h4>
                <p className="col-span-7">
                  {formatCurrency(listingData.auction.maxBid, "LKR")}
                </p>
              </div>
              <div className="grid grid-cols-12">
                <h4 className="text-gray-400 col-span-5">Listing code:</h4>
                <p className="col-span-7">{listingData._id}</p>
              </div>
            </div>
            <div className="flex gap-20">
              <div className="flex shrink-0 gap-2 items-center text-lg">
                <h4 className="text-gray-400">Bids:</h4>
                <p className="text-lg font-medium">
                  {listingData.auction.bids.length}
                </p>
              </div>
              <div className="flex shrink-0 gap-2 items-center text-lg">
                <h4 className="text-gray-400">Bidders:</h4>
                <p className="text-lg font-medium">{calBidders()}</p>
              </div>
              <div className="flex shrink-0 gap-2 items-center text-lg">
                <h4 className="text-gray-400">Time left:</h4>
                <p className="text-lg font-medium">
                  {formatTimeLeft(
                    new Date(
                      add(listingData.auction.startingDate, {
                        days: listingData.auction.duration,
                      })
                    )
                  )}
                </p>
              </div>
              <div className="flex shrink-0 gap-2 items-center text-lg">
                <h4 className="text-gray-400">Duration</h4>
                <p className="text-lg font-medium">
                  {listingData.auction.duration} days
                </p>
              </div>
            </div>
            <Button
              intent="primary"
              size="medium"
              className="my-10 rounded-full"
                onClick={() => setShowCreateBid(true)}
            >
              Place bid
            </Button>
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-gray-100 text-gray-400 font-medium">
                <tr>
                  <th className="text-left px-10 py-4">Bidder</th>
                  <th className=" text-left px-10 py-4">Bid Amount</th>
                  <th className=" text-left px-10 py-4">Bid Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {listingData.auction.bids.map((bid) => (
                  <tr className="hover:bg-gray-100" key={bid._id}>
                    <td className=" px-10 py-4">
                      {bid.bidder && getHiddenBidderName(bid.bidder)} (Feedback Score: 3)
                    </td>
                    <td className=" px-10 py-4">{formatCurrency(bid.amount)}</td>
                    <td className=" px-10 py-4">
                      {bid.updatedAt && formatDate(
                        new Date(bid.updatedAt),
                        "dd MMM yyyy 'at' hh:mm:ss a"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}

export default BidHistory;
