import React from "react";
import HeaderDropdownModal from "./HeaderDropdownModal";
import ProfileLinkList from "./ProfileLinkList";
import { cn } from "../utils/mergeClasses";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../utils/constants";
import { Link } from "react-router-dom";

type TProfileDropdownProps = React.HTMLAttributes<HTMLDivElement>;

function ProfileDropdown({ className, ...rest }: TProfileDropdownProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <HeaderDropdownModal className={cn("min-w-[16rem]", className)} {...rest}>
      {user && (
        <>
          <div className=" flex gap-3 items-center bg-gray-100 py-3 px-2 cursor-pointer">
            <div className="flex w-10 h-10 items-center justify-center bg-gray-400 text-white font-medium text-2xl rounded-full">
              {!user?.avatar && (
                <div className="p-3 text-base">
                  {user.firstName.charAt(0).toUpperCase() +
                    user.lastName.charAt(0).toUpperCase()}
                </div>
              )}
              {user.avatar && (
                <img
                  src={`${SERVER_URL}/images/${user.avatar}`}
                  alt="user-profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <h6 className="text-lg">
                Hi,{" "}
                <span className="font-medium">
                  {user.firstName + " " + user.lastName}
                </span>
              </h6>
              <p className="text-sm text-gray-300">Welcome back</p>
            </div>
          </div>
          <ProfileLinkList className="px-4 text-base" />
        </>
      )}
      {!user && (
        <div className="py-3 px-2">
          <h6 className="text-lg mb-3">
            Hi, <span className="font-medium">Guest</span>
          </h6>
          <p className="text-sm text-gray-300 mb-5">You are not logged in.</p>
          <div className="text-gray-300 mb-3">
            <p className="text-sm">Are you have carCheck account?</p>
            <Link to={"/signin"} className="text-base text-blue-300">
              Signin
            </Link>
          </div>
          <div className="text-gray-300 mb-3">
            <p className="text-sm">Are you new to carCheck?</p>
            <Link to={"/signup"} className="text-base text-blue-300">
              Signup
            </Link>
          </div>
        </div>
      )}
    </HeaderDropdownModal>
  );
}

export default ProfileDropdown;
