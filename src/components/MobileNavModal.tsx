import { useState } from "react";
import { IoClose } from "react-icons/io5";

import MobileNavPrimaryModel from "./MobileNavPrimaryModel";
import MobileNavSecondaryModal from "./MobileNavSecondaryModel";
import Button from "./ui/Button";
import { cn } from "../utils/mergeClasses";
import useHeaderContext from "../features/authentication/hooks/useHeaderContext";

type TMenus = "primary" | "secondary";

function MobileNavModal() {
  const { isMobileNavOpen, setIsMobileNavOpen } = useHeaderContext();
  const [activeMenu, setActiveMenu] = useState<TMenus>("primary");

  return (
    <div className="w-full h-full">
      {/* modal close button */}
      <Button
        onClick={() => {
          setIsMobileNavOpen(false);
          setActiveMenu("primary");
        }}
        intent={"iconRound"}
        size={"largeRound"}
        className={cn("fixed top-3 left-[21rem] bg-white p-2 z-50", {
          hidden: !isMobileNavOpen,
        })}
      >
        <IoClose />
      </Button>

      {/* modal content */}
      <div
        className={cn(
          "bg-white fixed top-0 left-0 w-[80%] max-w-[20rem] h-screen max-h-screen z-50 transition-all duration-300 ease-in-out",
          {
            "translate-x-[-100%]": !isMobileNavOpen,
          }
        )}
      >
        <div className="relative h-full w-full overflow-y-scroll overflow-hidden
        ">
          {/* primary menu screen */}
          <MobileNavPrimaryModel
            className={cn("absolute top-0 left-0 w-full h-full bg-white", {
              "overflow-hidden": activeMenu === "secondary",
            })}
            setActiveMenu={setActiveMenu}
          />

          {/* secondary menu screen */}
          <MobileNavSecondaryModal
            className={cn(
              "absolute top-0 left-0 w-full h-full bg-white transition-all duration-300 ease-in-out translate-x-0",
              {
                "translate-x-[100%] overflow-hidden": activeMenu === "primary",
              }
            )}
            setActiveMenu={setActiveMenu}
          />
        </div>
      </div>

      {/* modal overlay */}
      <div
        className={cn(
          "bg-gray-500 fixed top-0 left-0 w-full h-full bg-opacity-70 z-40 ",
          {
            hidden: !isMobileNavOpen,
          }
        )}
      ></div>
    </div>
  );
}

export default MobileNavModal;
