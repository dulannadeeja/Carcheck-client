import React from "react";
import Input from "../../../components/ui/Input";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import googleLogo from "../../../assets/images/google.png";
import facebookLogo from "../../../assets/images/facebook.png";
import appleLogo from "../../../assets/images/apple-logo.png";

function PersonalAccount() {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-1 mb-3">
          <Input
            type="text"
            placeholder="First Name"
            className="border-gray-200 bg-gray-50 w-full placeholder:text-gray-300"
          />
          <p className="text-red-300 text-sm">Please enter your first name</p>
        </div>
        <div className="flex flex-1 flex-col gap-1 mb-3">
          <Input
            type="text"
            placeholder="Last Name"
            className="border-gray-200 bg-gray-50 w-full placeholder:text-gray-300"
          />
          <p className="text-red-300 text-sm">Please enter your last name</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <Input
          type="text"
          placeholder="Email"
          className="w-full border-gray-200 bg-gray-50 placeholder:text-gray-300"
        />
        <p className="text-red-300 text-sm">
          Please enter a valid email address
        </p>
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
      <p className="text-gray-300 mt-4">
        By selecting{" "}
        <span className="font-medium">Create a personal account</span>, you
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
        Create personal account
      </Button>
      <div className="flex w-full items-end mb-7">
        <hr className="flex-1 border-gray-200" />
        <span className="block shrink-0 text-sm">or continue with</span>
        <hr className="flex-1 border-gray-200" />
      </div>
      <div className="flex flex-col gap-4">
        <Button
          intent="secondary"
          className="rounded-full w-full flex items-center justify-center"
        >
          <img src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-2" />
          <span className="font-medium">Continue with Google</span>
        </Button>
        <Button
          intent="secondary"
          className="rounded-full w-full flex items-center justify-center"
        >
          <img
            src={facebookLogo}
            alt="Facebook Logo"
            className="w-5 h-5 mr-2"
          />
          <span className="font-medium">Continue with Facebook</span>
        </Button>
        <Button
          intent="secondary"
          className="rounded-full w-full flex items-center justify-center"
        >
          <img src={appleLogo} alt="Apple Logo" className="w-5 h-5 mr-2" />
          <span className="font-medium">Continue with Apple</span>
        </Button>
      </div>
    </div>
  );
}

export default PersonalAccount;
