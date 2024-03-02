import React from "react";

// utils
import { cn } from "../../../utils/mergeClasses";
import buttonVariations from "../../../utils/buttonVariations";
import CartDropdownList from "./CartDropdownList";

type TCartDropdownProps = React.HTMLAttributes<HTMLDivElement>;

function CartDropdown({ className, ...rest }: TCartDropdownProps) {
  return (
    <div className={cn("border-2", className)} {...rest}>
      <div className="h-full w-full bg-white shadow-xl py-4">
        <h2 className="text-lg font-medium text-gray-900 mb-8 px-4">
          Shopping cart
        </h2>

        <CartDropdownList />
        <div className="border-t border-gray-200 pt-6 mt-7 px-4 z-50">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$26245.00</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <a
            href="#"
            className={cn(
              buttonVariations({ intent: "primary", size: "medium" }),
              "w-full flex justify-center mt-6"
            )}
          >
            Checkout
          </a>
          <a
            href="#"
            className={cn(
              buttonVariations({ intent: "secondary", size: "medium" }),
              "w-full flex justify-center mt-3"
            )}
          >
            View Cart
          </a>
        </div>
      </div>
      <div className="fixed top-[3rem] right-0 h-screen w-screen bg-black bg-opacity-50 -z-10"></div>
    </div>
  );
}

export default CartDropdown;
