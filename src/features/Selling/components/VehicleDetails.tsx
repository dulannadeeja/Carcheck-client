import React from "react";
import { ListingResponseType } from "../../listing/listing";
import { SERVER_URL } from "../../../utils/constants";
import { formatEngineCapacity, formatMileage, mapOwners } from "../../../utils/format";

type VehicleDetailsProps = {
  listing: ListingResponseType | undefined;
};

function VehicleDetails({ listing }: VehicleDetailsProps) {
  return (
    <div className="border-b border-gray-200 pb-10">
      <h2 className="text-lg font-semibold">Vehicle details</h2>
      {listing && (
        <div className="grid grid-cols-12 gap-5">
          <div className="flex flex-col gap-3 col-span-6">
            <div className="grid grid-cols-12">
              <p className="col-span-5 text-gray-300">Registered Year</p>
              <p className="col-span-7">{listing?.registeredYear}</p>
            </div>
            <div className="grid grid-cols-12">
              <p className="col-span-5 text-gray-300">Category</p>
              <p className="col-span-7">{listing?.bodyType}</p>
            </div>
            <div className="grid grid-cols-12">
              <p className="col-span-5 text-gray-300">Engine Capacity</p>
              <p className="col-span-7">
                {formatEngineCapacity(listing?.engineCapacity)}
              </p>
            </div>
            <div className="grid grid-cols-12">
              <p className="col-span-5 text-gray-300">Previous owners</p>
              <p className="col-span-7">{mapOwners(listing?.numberOfPreviousOwners)}</p>
            </div>
            <div className="grid grid-cols-12">
              <p className="col-span-5 text-gray-300">Fuel type</p>
              <p className="col-span-7">{listing?.fuelType}</p>
            </div>
            <div className="grid grid-cols-12">
              <p className="col-span-5 text-gray-300">Exterior color</p>
              <p className="col-span-7">{listing?.exteriorColor}</p>
            </div>
            <div className="grid grid-cols-12">
              <p className="col-span-5 text-gray-300">Make</p>
              <p className="col-span-7">{listing?.make}</p>
            </div>
            <div className="grid grid-cols-12">
              <p className="col-span-5 text-gray-300">Model</p>
              <p className="col-span-7">{listing?.vehicleModel}</p>
            </div>
            <div className="grid grid-cols-12">
              <p className="col-span-5 text-gray-300">Manufactured year</p>
              <p className="col-span-7">{listing?.manufacturedYear}</p>
            </div>
            <div className="grid grid-cols-12">
              <p className="col-span-5 text-gray-300">Mileage</p>
              <p className="col-span-7">{formatMileage(listing?.mileage)}</p>
            </div>
            <div className="grid grid-cols-12">
              <p className="col-span-5 text-gray-300">Transmission</p>
              <p className="col-span-7">{listing?.transmission}</p>
            </div>
            <div className="grid grid-cols-12">
              <p className="col-span-5 text-gray-300">Drive type</p>
              <p className="col-span-7">{listing?.driveType}</p>
            </div>
          </div>
          <div className="bg-gray-50 shadow-sm border border-gray-200 rounded-lg aspect-square overflow-hidden w-full max-w-[10rem] md:max-w-full col-span-6">
            <img
              src={`${SERVER_URL}/images/${listing?.images[0]}`}
              alt="listing image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleDetails;
