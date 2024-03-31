import React from "react";
import Input from "../../../components/ui/Input";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import BusinessType from "./BusinessType";

function BusinessAccount() {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div>
      <p className="mb-4">
        Continue to register as <span className="font-medium">business</span>,
        if you have a registered <span className="font-medium"></span>spare
        parts business, car dealership or a automobile service point.
      </p>
      <div className="flex flex-1 flex-col gap-1 mb-3">
        <Input
          type="text"
          placeholder="Business Name"
          className="border-gray-200 bg-gray-50 w-full placeholder:text-gray-300"
        />
        <p className="text-red-300 text-sm">Please enter your business name</p>
      </div>
      <div className="flex flex-1 flex-col gap-1 mb-3">
        <Input
          type="email"
          placeholder="Business Email"
          className="border-gray-200 bg-gray-50 w-full placeholder:text-gray-300"
        />
        <p className="text-red-300 text-sm">Please enter your business email</p>
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border-gray-200 bg-gray-50 pr-10 placeholder:text-gray-300"
          />
          {!showPassword ? (
            <IoEyeOutline
              className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer text-xl"
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <IoEyeOffOutline
              className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer text-xl"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        <p className="text-red-300 text-sm">Please enter a password</p>
      </div>
      <BusinessType />
      <p className="text-gray-300 mt-4">
        By selecting{" "}
        <span className="font-medium">Create a business account</span>, you
        agree to our{" "}
        <Link to="/userAgreement" className="underline">
          User Agreement
        </Link>{" "}
        and acknowledge reading our{" "}
        <Link to="/userAgreement" className="underline">
          User Privacy Notice
        </Link>
      </p>
      <Button
        intent="primary"
        className="rounded-full w-full flex items-center justify-center mt-4 mb-5"
      >
        {" "}
        Create business account
      </Button>
    </div>
  );
}

export default BusinessAccount;
