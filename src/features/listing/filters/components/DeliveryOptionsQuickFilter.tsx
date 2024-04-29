import { useState } from "react";
import Button from "../../../../components/ui/Button";
import { IoChevronDownOutline } from "react-icons/io5";
import Checkbox from "../../../../components/ui/Checkbox";
import { cn } from "../../../../utils/mergeClasses";

function DeliveryOptionsQuickFilter() {
  const [open, setOpen] = useState(false);

  // set click event listener to close the dropdown when clicked outside
  // of the dropdown
  window.addEventListener("click", (e) => {
    // if the dropdown is open and the click event target is not the #deliveryOptionsQuickFilter
    // then close the dropdown
    if (open && !(e.target as Element).closest("#deliveryOptionsQuickFilter")) {
      setOpen(false);
    }
  });

  return (
    <div className="flex relative" id="deliveryOptionsQuickFilter">
      <Button
        intent="iconText"
        size="none"
        className="text-gray-600 px-5 py-1 rounded-full hover:bg-gray-150 bg-gray-100 border border-gray-200 border-solid"
        onClick={() => setOpen(!open)}
      >
        <span>Delivery Options</span>
        <IoChevronDownOutline />
      </Button>
      <article
        className={cn(
          "absolute top-10 left-0 min-w-40 bg-white border border-gray-200 border-solid rounded-lg shadow-lg",
          {
            hidden: !open,
          }
        )}
      >
        <ul className="flex gap-3 flex-col px-4 py-3">
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Free Delivery</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>In Store Pickup</label>
          </li>
          <li className="flex gap-2 items-center">
            <Checkbox />
            <label>Next Day Delivery</label>
          </li>
        </ul>
      </article>
    </div>
  );
}

export default DeliveryOptionsQuickFilter;
