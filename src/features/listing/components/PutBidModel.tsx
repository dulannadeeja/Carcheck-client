import React, { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function PutBidModel({ isOpen, onClose }: Props) {
  const [bid, setBid] = useState("");

  if (!isOpen) return null;

  const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBid(event.target.value);
  };

  const placeBid = () => {
    console.log("Bid Placed:", bid);
    onClose(); // Close the modal after placing the bid
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg relative">
        <h2 className="text-lg font-bold">Place Your Bid</h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold"
        >
          &times;
        </button>
        <div className="mt-4">
          <label className="max-w-48 border border-gray-150 flex items-center p-2 rounded-md bg-gray-50">
            <span className="text-gray-300 font-medium">LKR</span>
            <Input
              type="number"
              className="border-none rounded-md p-0 pl-3 focus:outline-none"
              value={bid}
              onChange={handleBidChange}
            />
          </label>
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
  );
}

export default PutBidModel;
