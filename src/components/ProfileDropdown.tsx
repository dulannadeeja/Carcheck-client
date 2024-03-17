import React from "react";
import HeaderDropdownModal from "./HeaderDropdownModal";
import ProfileLinkList from "./ProfileLinkList";
import { cn } from "../utils/mergeClasses";

type TProfileDropdownProps = React.HTMLAttributes<HTMLDivElement>;

function ProfileDropdown({ className, ...rest }: TProfileDropdownProps) {
  return (
    <HeaderDropdownModal className={cn("min-w-[16rem]", className)} {...rest}>
      <div className=" flex justify-between items-center gap-2 bg-gray-100 py-3 px-2 cursor-pointer">
        <div className="p-3 flex items-center justify-center bg-gray-400 text-white font-medium text-2xl rounded-full">
          <span>DA</span>
        </div>
        <div>
          <h6 className="text-lg">
            Hi, <span className="font-medium">Dulan abeysinghe</span>
          </h6>
          <p className="text-sm text-gray-300">Welcome back</p>
        </div>
      </div>
      <ProfileLinkList className="px-4 text-base" />
    </HeaderDropdownModal>
  );
}

export default ProfileDropdown;
