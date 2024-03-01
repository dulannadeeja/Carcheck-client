import React from "react";

import MobileNavList from "./MobileNavList";

type TMenus = "primary" | "secondary";

interface MobileNavPrimaryModelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  setActiveMenu: React.Dispatch<React.SetStateAction<TMenus>>;
}

function MobileNavPrimaryModel({
  setActiveMenu,
  ...props
}: MobileNavPrimaryModelProps) {
  return (
    <div {...props}>
      <div
        className="flex justify-between items-center gap-2 bg-gray-100 py-3 px-2 cursor-pointer"
        onClick={() => setActiveMenu("secondary")}
      >
        <div className="p-3 flex items-center justify-center bg-gray-400 text-white font-medium text-2xl rounded-full">
          <span>DA</span>
        </div>
        <div>
          <h6 className="text-lg">
            Hi, <span className="font-medium">Dulan abeysinghe</span>
          </h6>
          <p className="text-sm text-gray-300">Welcome back</p>
        </div>
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
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>
      <MobileNavList />
    </div>
  );
}

export default MobileNavPrimaryModel;
