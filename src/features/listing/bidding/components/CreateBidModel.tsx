import React, { useCallback, useEffect, useState } from "react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import {
  useCreateBidMutation,
  useGetListingQuery,
} from "../../clientListingApi";
import { toast } from "react-toastify";
import { ErrorResponse } from "react-router-dom";
import { formatCurrency } from "../../../../utils/format";
import { RxCross2 } from "react-icons/rx";

type Props = {
  onClose: () => void;
  listingId: string;
};

function CreateBidModel({ onClose, listingId }: Props) {
  const { data, isSuccess } = useGetListingQuery(listingId);
  const [bid, setBid] = useState("");
  const [minimumBid, setMinimumBid] = useState(0);
  const [bidError, setBidError] = useState("");
  const [createBid] = useCreateBidMutation();
  const [recommededBids, setRecommededBids] = useState<number[]>([]);

  const getRecommendedBids = useCallback(() => {
    const bids = [];
    const incrementPercent = 0.05; // Increment by 5%
    let currentBid = minimumBid;

    for (let i = 0; i < 5; i++) {
      currentBid += currentBid * incrementPercent;
      if (currentBid < 1000) {
        currentBid = Math.ceil(currentBid / 5) * 5; 
      } else if (currentBid < 10000) {
        currentBid = Math.ceil(currentBid / 50) * 50; 
      } else if (currentBid < 100000) {
        currentBid = Math.ceil(currentBid / 500) * 500; 
      } else if (currentBid < 1000000) {
        currentBid = Math.ceil(currentBid / 1000) * 1000;
      } else if (currentBid < 10000000) {
        currentBid = Math.ceil(currentBid / 10000) * 10000;
      } else {
        currentBid = Math.ceil(currentBid / 100000) * 100000;
      }
      bids.push(currentBid);
    }

    return bids;
  }, [minimumBid]);

  useEffect(() => {
    if (isSuccess) {
      setMinimumBid(data?.data.auction.maxBid || data.data.auction.startingBid);
      setRecommededBids(getRecommendedBids());
    }
  }, [isSuccess, data, getRecommendedBids]);

  useEffect(() => {
    // validate bid amount
    if(!bid){
      setBidError("Looks like you forgot to enter the bid amount")
      return;
    }
    if (parseInt(bid) < minimumBid) {
      setBidError("Bid amount should be greater than the minimum bid amount");
    } else {
      setBidError("");
    }
  }, [bid, minimumBid]);

  const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(isNaN(event.target.value as never)){
      return;
    }
    setBid(event.target.value);
  };

  const onClickRecommendedBid = (amount: number) => {
    setBid(amount.toString());
  }

  const placeBid = async () => {
    try {

      if(!bid){
        setBidError("Looks like you forgot to enter the bid amount")
        return;
      }

      if (parseInt(bid) < minimumBid) {
        setBidError("Bid amount should be greater than the minimum bid amount");
        return;
      }

      if (bidError) {
        return;
      }

      const response = await createBid({
        listingId: listingId,
        bidAmount: parseInt(bid),
      }).unwrap();

      if (response.success) {
        toast.success("Bid placed successfully");
        // close the modal and refresh the page
        onClose();
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      const error = err as ErrorResponse;
      if(error.data.message){
        setBidError(error.data.message);
      }
      toast.error(error.data.message || "Failed to place bid");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[50]">
      <div className="bg-white p-7 rounded-lg shadow-lg relative z-[100] min-w-[40rem] min-h-[30rem]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Place Your Bid</h2>
          <button onClick={onClose} className="text-2xl font-bold">
            <RxCross2 />
          </button>
        </div>
        <div>
          {recommededBids.length > 0 && (
            <div className="flex gap-5 flex-col">
              <h3 className="text-lg font-medium">Recommended Bids:</h3>
              <div className="flex gap-3 flex-wrap max-w-[80%]">
                {recommededBids.map((b, index) => (
                  <Button
                    intent={"secondary"}
                    size={"none"}
                    key={index}
                    className="border border-gray-200 rounded-md shrink-0 p-2"
                    onClick={() => onClickRecommendedBid(b)}
                  >
                    {formatCurrency(b)}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="mt-4">
            <label className="w-[30rem] border border-gray-150 flex items-center p-2 rounded-md bg-gray-50">
              <span className="text-gray-300 font-medium">LKR</span>
              <Input
                type="text"
                className="border-none rounded-md p-0 pl-3 focus:outline-none "
                value={bid}
                onChange={handleBidChange}
              />
            </label>
            <p className="text-gray-400 text-sm mt-2 mb-2">
              Minimum bid amount: <span className="font-medium text-base">{formatCurrency(minimumBid)}</span>
            </p>
            {bidError && <p className="text-red-300 text-sm">{bidError}</p>}
          </div>
          <div className="mt-4">
            <Button
              intent={"primary"}
              onClick={placeBid}
              className="rounded-full"
            >
              Place Bid
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBidModel;
