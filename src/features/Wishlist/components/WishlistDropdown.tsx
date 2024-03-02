import React from "react";
import { cn } from "../../../utils/mergeClasses";
import buttonVariations from "../../../utils/buttonVariations";
import WishlistDropdownList from "./WishlistDropdownList";

type TWhishlistDropdownProps = React.HTMLAttributes<HTMLDivElement>;

function WishlistDropdown({ className, ...rest }: TWhishlistDropdownProps) {
  return (
    <div
      className={cn("border-2 border-gray-300 border-dashed", className)}
      {...rest}
    >
      <div className="h-full w-full bg-white shadow-xl py-4">
        <h2 className="text-lg font-medium text-gray-900 mb-8 px-4">
          Wishlist
        </h2>

        <WishlistDropdownList className="h-full" />
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
      </div>
      <div className="fixed top-[3rem] right-0 h-screen w-screen bg-black bg-opacity-50 -z-10"></div>
    </div>
  );
}

export default WishlistDropdown;
