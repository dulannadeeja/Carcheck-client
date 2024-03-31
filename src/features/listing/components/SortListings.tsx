import { useState } from "react";
import Button from "../../../components/ui/Button";
import { IoChevronDownOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";

function SortListings() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("bestMatch");

  // set open to false when clicked outside the sortListing
  document.addEventListener("click", (e) => {
    const sortListing = document.getElementById("sortListing");
    if (sortListing && !sortListing.contains(e.target as Node)) {
      setOpen(false);
    }
  });

  return (
    <div className="flex relative" id="sortListing">
      <Button
        intent="iconText"
        size="none"
        className="text-gray-600 px-5 py-1 rounded-full hover:bg-gray-150 bg-gray-100 border border-gray-200 border-solid"
        onClick={() => setOpen(!open)}
      >
        <span>Sort: Best Match</span>
        <IoChevronDownOutline />
      </Button>
      <article
        className={`absolute top-10 left-0 min-w-60 bg-white border border-gray-200 border-solid rounded-lg shadow-lg ${
          open ? "" : "hidden"
        }`}
      >
        <ul className="flex gap-3 flex-col px-4 py-3">
          <li
            className="flex gap-5 items-center justify-between cursor-pointer"
            onClick={() => setSelected("bestMatch")}
          >
            <p
              className={
                selected === "bestMatch" ? "text-blue-500 font-medium" : ""
              }
            >
              Best Match
            </p>
            {selected === "bestMatch" && <GiCheckMark />}
          </li>
          <li
            className="flex gap-5 items-center justify-between cursor-pointer"
            onClick={() => setSelected("endingSoonest")}
          >
            <p
              className={
                selected === "endingSoonest" ? "text-blue-500 font-medium" : ""
              }
            >
              Time: ending soonest
            </p>
            {selected === "endingSoonest" && <GiCheckMark />}
          </li>
          <li
            className="flex gap-5 items-center justify-between cursor-pointer"
            onClick={() => setSelected("newlyListed")}
          >
            <p
              className={
                selected === "newlyListed" ? "text-blue-500 font-medium" : ""
              }
            >
              Time: newly listed
            </p>
            {selected === "newlyListed" && <GiCheckMark />}
          </li>
          <li
            className="flex gap-5 items-center justify-between cursor-pointer"
            onClick={() => setSelected("priceLowest")}
          >
            <p
              className={
                selected === "priceLowest" ? "text-blue-500 font-medium" : ""
              }
            >
              Price: lowes first
            </p>
            {selected === "priceLowest" && <GiCheckMark />}
          </li>
          <li
            className="flex gap-5 items-center justify-between cursor-pointer"
            onClick={() => setSelected("priceHighest")}
          >
            <p
              className={
                selected === "priceHighest" ? "text-blue-500 font-medium" : ""
              }
            >
              Price: highest first
            </p>
            {selected === "priceHighest" && <GiCheckMark />}
          </li>
          <li
            className="flex gap-5 items-center justify-between cursor-pointer"
            onClick={() => setSelected("distance")}
          >
            <p
              className={
                selected === "distance" ? "text-blue-500 font-medium" : ""
              }
            >
              Distance: nearest first
            </p>
            {selected === "distance" && <GiCheckMark />}
          </li>
        </ul>
      </article>
    </div>
  );
}

export default SortListings;
