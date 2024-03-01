import React from "react";
import MobileNavProfileList from "./MobileNavProfileList";
import Button from "./ui/Button";

type TMenus = "primary" | "secondary";

interface MobileNavSecondaryModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  setActiveMenu: React.Dispatch<React.SetStateAction<TMenus>>;
}

function MobileNavSecondaryModal({
  setActiveMenu,
  ...props
}: MobileNavSecondaryModalProps) {
  return (
    <div {...props}>
      <div className="flex justify-start items-center gap-4 bg-gray-100 py-3 px-2">
        {/* back svg */}
        <Button
          intent="iconRound"
          size="largeRound"
          onClick={() => setActiveMenu("primary")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Button>
        <h6
          onClick={() => setActiveMenu("secondary")}
          className="text-lg font-medium"
        >
          Menu
        </h6>
      </div>
      <MobileNavProfileList />
    </div>
  );
}

export default MobileNavSecondaryModal;
