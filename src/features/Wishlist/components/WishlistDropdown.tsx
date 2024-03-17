import React from "react";
import { cn } from "../../../utils/mergeClasses";
import buttonVariations from "../../../utils/buttonVariations";
import WishlistDropdownList from "./WishlistDropdownList";
import HeaderDropdownModal from "../../../components/HeaderDropdownModal";

type TWhishlistDropdownProps = React.HTMLAttributes<HTMLDivElement>;

function WishlistDropdown({ className, ...rest }: TWhishlistDropdownProps) {
  return (
    <HeaderDropdownModal className={cn("", className)} {...rest}>
      <h2 className="text-lg font-medium text-gray-900 mb-8 px-4">Wishlist</h2>

      <WishlistDropdownList className="overflow-y-scroll px-4" />
      <div className="pt-4 px-4 z-50">
        <a
          href="#"
          className={cn(
            buttonVariations({ intent: "primary", size: "medium" }),
            "w-full flex justify-center mt-6"
          )}
        >
          View Wishlist
        </a>
      </div>
    </HeaderDropdownModal>
  );
}

export default WishlistDropdown;
