import React from "react";
import { cn } from "../utils/mergeClasses";

type THeaderDropdownModalProps = React.HTMLAttributes<HTMLDivElement>;

function HeaderDropdownModal({
  children,
  className,
  ...rest
}: THeaderDropdownModalProps) {
  return (
    <div
      className={cn(
        "absolute right-0 w-fit max-h-screen-15rem max-w-screen-2rem min-w-[20.5rem] z-[100]",
        className
      )}
      {...rest}
    >
      <div className="h-full w-full bg-white border-[0.05rem] border-solid border-gray-300 py-4 max-h-screen-15rem flex flex-col">
        {children}
      </div>
      <div className="fixed top-[3rem] right-0 h-screen w-screen bg-black bg-opacity-50 -z-10"></div>
    </div>
  );
}

export default HeaderDropdownModal;
