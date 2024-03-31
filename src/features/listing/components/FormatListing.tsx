import { useState } from "react";
import Button from "../../../components/ui/Button";
import { IoChevronDownOutline, IoGridOutline } from "react-icons/io5";
import { LuList } from "react-icons/lu";
import { FaListUl } from "react-icons/fa";
import { cn } from "../../../utils/mergeClasses";

function FormatListing() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("list");

  // set open to false when clicked outside the formatListing
  document.addEventListener("click", (e) => {
    const formatListing = document.getElementById("formatListing");
    if (formatListing && !formatListing.contains(e.target as Node)) {
      setOpen(false);
    }
  });

  return (
    <div className="flex relative" id="formatListing">
      <Button
        intent="iconText"
        size="none"
        className="text-gray-600 px-5 py-1 rounded-full hover:bg-gray-150 bg-gray-100 border border-gray-200 border-solid"
        onClick={() => setOpen(!open)}
      >
        <LuList className="text-base" />
        <IoChevronDownOutline />
      </Button>
      <article
        className={`absolute top-10 left-0 min-w-[8rem] bg-white border border-gray-200 border-solid rounded-lg shadow-lg ${
          open ? "" : "hidden"
        }`}
      >
        <ul className="flex gap-3 flex-col px-4 py-3">
          <li
            className={cn(
              "flex gap-2 items-center justify-between cursor-pointer",
              {
                "text-blue-500 font-medium": selected === "list",
              }
            )}
            onClick={() => setSelected("list")}
          >
            <p>List View</p>
            <FaListUl
              className={selected === "list" ? "text-blue-500 text-base" : ""}
            />
          </li>
          <li
            className={cn(
              "flex gap-2 items-center justify-between cursor-pointer",
              {
                "text-blue-500 font-medium": selected === "grid",
              }
            )}
            onClick={() => setSelected("grid")}
          >
            <p>Gallery View</p>
            <IoGridOutline
              className={selected === "grid" ? "text-blue-500 text-base " : ""}
            />
          </li>
        </ul>
      </article>
    </div>
  );
}

export default FormatListing;
