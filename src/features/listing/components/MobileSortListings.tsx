import { useState } from "react";
import Button from "../../../components/ui/Button";
import { RxCaretSort } from "react-icons/rx";
import { GiCheckMark } from "react-icons/gi";

type MobileSortListingsProps = {
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MobileSortListings({ setIsModelOpen }: MobileSortListingsProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("bestMatch");

  return (
    <div className="flex relative" id="sortListing">
      <Button
        intent="iconText"
        size="none"
        className="text-blue-300 gap-1"
        onClick={() => {
          setOpen(!open);
          setIsModelOpen(!open);
        }}
      >
        <RxCaretSort className="text-lg"/>
        <span>Sort</span>
      </Button>
      <article
        className={`fixed top-[5rem] left-0 bottom-0 right-0 bg-white border border-gray-200 border-solid rounded-t-2xl shadow-lg z-20 transition-all ease-in-out duration-300 transform ${
          open ? "translate-y-0" : "translate-y-[200%] opacity-0"
        }`}
      >
        <div className="grid grid-cols-3 px-4 pt-4">
          <h6 className="text-lg font-medium text-center col-start-2">
            Sort by
          </h6>
          <Button
            intent="iconText"
            size="none"
            className="text-blue-300 text-base justify-self-end"
            onClick={() => {
              setOpen(false);
              setIsModelOpen(false);
            }}
          >
            <span>Done</span>
          </Button>
        </div>
        <ul className="flex gap-3 flex-col py-7 text-base">
          <li
            className="flex gap-5 items-center justify-between cursor-pointer px-4 pb-2"
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
          <hr className="border-t border-gray-200 pb-2" />
          <li
            className="flex gap-5 items-center justify-between cursor-pointer px-4 pb-2"
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
          <hr className="border-t border-gray-200 pb-2" />
          <li
            className="flex gap-5 items-center justify-between cursor-pointer px-4 pb-2"
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
          <hr className="border-t border-gray-200 pb-2" />
          <li
            className="flex gap-5 items-center justify-between cursor-pointer px-4 pb-2"
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
          <hr className="border-t border-gray-200 pb-2" />
          <li
            className="flex gap-5 items-center justify-between cursor-pointer px-4 pb-2"
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
          <hr className="border-t border-gray-200 pb-2" />
          <li
            className="flex gap-5 items-center justify-between cursor-pointer px-4 pb-2"
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
          <hr className="border-t border-gray-200 pb-2" />
          <li
            className="flex gap-5 items-center justify-between cursor-pointer px-4 pb-2"
            onClick={() => setSelected("lowestMileage")}
          >
            <p
              className={
                selected === "lowestMileage" ? "text-blue-500 font-medium" : ""
              }
            >
              Mileage: lowest first
            </p>
            {selected === "lowestMileage" && <GiCheckMark />}
          </li>
          {/* newset year */}
          <hr className="border-t border-gray-200 pb-2" />
          <li
            className="flex gap-5 items-center justify-between cursor-pointer px-4 pb-2"
            onClick={() => setSelected("newestYear")}
          >
            <p
              className={
                selected === "newestYear" ? "text-blue-500 font-medium" : ""
              }
            >
              Year: newest first
            </p>
            {selected === "newestYear" && <GiCheckMark />}
          </li>
        </ul>
      </article>
      <div
        className={
          open
            ? "fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 z-10 transition-all ease-in-out translate-y-0 duration-300"
            : "translate-y-[200%] opacity-0"
        }
        onClick={() => setOpen(false)}
      ></div>
    </div>
  );
}

export default MobileSortListings;
