import React, { useState } from "react";
import { useGetActiveListingsQuery } from "../SellerApiSlice";
import PaginationController from "../../../components/PaginationController";
import { SERVER_URL } from "../../../utils/constants";
import { useUpdateListingMutation } from "../listing/listingApiSlice";
import { ListingResponseType, ListingState } from "../../listing/clientListing";
import Button from "../../../components/ui/Button";
import { toast } from "react-toastify";
import { limitString } from "../../../utils/format";

const Active = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetActiveListingsQuery({
    page,
    limit: 10,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [updateListing, { isLoading: updating }] = useUpdateListingMutation();

  const toggleDropdown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({ x: rect.left, y: rect.bottom });
    setSelectedId(id);
    setDropdownOpen(selectedId !== id || !dropdownOpen);
  };

  const onEndListing = async (data: ListingResponseType) => {
    try {
      if (selectedId) {
        await updateListing({
          data: {
            ...data,
            status: ListingState.unsold,
          },
          id: selectedId,
        });

        toast.success("Listing moved to unsold listings.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to end listing.");
    } finally {
      refetch();
      setDropdownOpen(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-lg font-medium mb-5">Active Listings</h2>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-medium">
            <tr>
              <th
                scope="col"
                className="py-3 px-6 text-left truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Actions
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-left truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Image
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-left"
                style={{ maxWidth: "150px" }}
              >
                Title
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-left truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Make/Model
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-right truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Year
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-right truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Mileage (km)
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-right truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Price
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-left truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Condition
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-left truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Transmission
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-left truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Fuel Type
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-left truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Body Type
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-left truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Drive Type
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-right truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Doors
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-right truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Seats
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-left truncate overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Color
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data.map((row) => (
                <tr key={row._id} className="bg-white border-b">
                  <td className="py-4 px-6">
                    <button
                      onClick={(event) => toggleDropdown(event, row._id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    </button>
                    {dropdownOpen && selectedId === row._id && (
                      <div
                        style={{
                          left: `${dropdownPosition.x}px`,
                          top: `${dropdownPosition.y}px`,
                        }}
                        className="origin-top-right fixed z-50 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      >
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <Button
                            intent={"iconText"}
                            size={"none"}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full justify-start"
                            role="menuitem"
                            onClick={() => onEndListing(row)}
                            disabled={updating}
                          >
                            End Listing
                          </Button>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Edit Listing
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 min-w-[10rem]">
                    <img
                      src={`${SERVER_URL}/images/${row.images[0]}`}
                      alt={row.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-blue-300 underline">
                      {limitString(row.title, 60)}
                    </p>
                  </td>
                  <td className="py-4 px-6 truncate overflow-hidden text-ellipsis whitespace-nowrap">{`${row.make} ${row.vehicleModel}`}</td>
                  <td className="py-4 px-6 text-right truncate overflow-hidden text-ellipsis whitespace-nowrap">
                    {row.manufacturedYear}
                  </td>
                  <td className="py-4 px-6 text-right truncate overflow-hidden text-ellipsis whitespace-nowrap">
                    {row.mileage}
                  </td>
                  <td className="py-4 px-6 text-right truncate overflow-hidden text-ellipsis whitespace-nowrap">
                    {row.listingType === "Fixed Price"
                      ? `$${row.fixedPrice}`
                      : `Bid starts at $${row.auction.startingBid}`}
                  </td>
                  <td className="py-4 px-6 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                    {row.condition}
                  </td>
                  <td className="py-4 px-6 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                    {row.transmission}
                  </td>
                  <td className="py-4 px-6 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                    {row.fuelType}
                  </td>
                  <td className="py-4 px-6 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                    {row.bodyType}
                  </td>
                  <td className="py-4 px-6 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                    {row.driveType}
                  </td>
                  <td className="py-4 px-6 truncate overflow-hidden text-ellipsis whitespace-nowrap text-right">
                    {row.numberOfDoors}
                  </td>
                  <td className="py-4 px-6 truncate overflow-hidden text-ellipsis whitespace-nowrap text-right">
                    {row.numberOfSeats}
                  </td>
                  <td className="py-4 px-6 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                    {row.exteriorColor}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {data && (
        <PaginationController
          totalPages={data.totalPages}
          currentPage={data.page}
          totalRecords={data.total}
          setPageNumber={setPage}
        />
      )}
    </div>
  );
};

export default Active;
