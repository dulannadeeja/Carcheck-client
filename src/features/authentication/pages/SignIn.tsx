import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/brand/logo.svg";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Checkbox from "../../../components/ui/Checkbox";
import ContainerSmall from "../../../components/ui/ContainerSmall";
import googleLogo from "../../../assets/images/google.png";
import facebookLogo from "../../../assets/images/facebook.png";
import appleLogo from "../../../assets/images/apple-logo.png";
import { ClipLoader } from "react-spinners";
import { cn } from "../../../utils/mergeClasses";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [isSecondStep, setIsSecondStep] = useState(true);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const [isSignInDisabled, setIsSignInDisabled] = useState(true);

  return (
    <ContainerSmall>
      <div className="flex flex-col items-center gap-5 my-10 max-w-[23rem] mx-auto">
        <Link to="/" className="mb-4">
          <img src={logo} alt="logo" className="w-40" />
        </Link>
        <div className="self-start md:self-auto md:items-center flex-col flex gap-1 mb-4">
          <p className="text-xl font-medium">
            {!isSecondStep ? "Hello" : "Welcome"}
          </p>
          {!isSecondStep && (
            <div className="flex gap-1">
              <h2>Sign in to carCheck or</h2>
              <Link to="/signup" className="underline text-blue-300">
                create an account
              </Link>
            </div>
          )}
          {isSecondStep && (
            <>
              <p>{emailOrUsername}</p>
              <div className="flex gap-1">
                <p>Not you?</p>
                <Button
                  intent="iconText"
                  size="none"
                  className="underline text-blue-300"
                  onClick={() => setIsSecondStep(false)}
                >
                  Switch account
                </Button>
              </div>
            </>
          )}
        </div>
        {!isSecondStep ? (
          <Input
            type="text"
            placeholder="Email or Username"
            className="placeholder:text-gray-600 placeholder:font-medium bg-gray-50 border-gray-200 py-2 px-3"
          />
        ) : (
          <Input
            type="password"
            placeholder="Password"
            className="placeholder:text-gray-600 placeholder:font-medium bg-gray-50 border-gray-200 py-2 px-3"
          />
        )}
        {!isSecondStep && (
          <>
            <Button
              intent="primary"
              className={cn(
                "rounded-full w-full font-medium py-2 flex items-center justify-center",
                {
                  "opacity-50 bg-gray-200 hover:bg-gray-200 cursor-not-allowed":
                    isContinueDisabled,
                }
              )}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                <span>Continue</span>
              )}
            </Button>
            <div className="flex w-full items-end mb-4">
              <hr className="flex-1 border-gray-200" />
              <span className="block shrink-0 text-sm">or</span>
              <hr className="flex-1 border-gray-200" />
            </div>
            <Button
              intent="secondary"
              className="rounded-full w-full flex items-center justify-center"
            >
              <img
                src={googleLogo}
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
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
          </>
        )}
        {isSecondStep && (
          <>
            <Button
              intent="primary"
              className={cn(
                "rounded-full w-full font-medium py-2 flex items-center justify-center",
                {
                  "opacity-50 bg-gray-200 hover:bg-gray-200 cursor-not-allowed":
                    isSignInDisabled,
                }
              )}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                <span>Sign in</span>
              )}
            </Button>
            <Link to="/forgot-password" className="text-blue-300 underline">
              Need help signing in?
            </Link>
          </>
        )}

        <div className="flex flex-col items-center max-w-60 mt-3 text-sm">
          <label className="flex items-center gap-2 mb-2">
            <Checkbox />
            <span>Stay signed in</span>
          </label>
          <p className="text-sm text-center">
            <span>Using a public or shared device?</span>
            <span>Uncheck to protect your account.</span>
          </p>
        </div>
      </div>
    </ContainerSmall>
  );
}

export default SignIn;
