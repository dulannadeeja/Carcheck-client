import React from "react";
import logo from "../../../assets/brand/logo.svg";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import PersonalAccount from "../components/PersonalAccount";
import { cn } from "../../../utils/mergeClasses";
import personalImage from "../../../assets/images/personal.jpg";
import Container from "../../../components/ui/Container";
import businessImage from "../../../assets/images/business.jpg";
import BusinessAccount from "../components/BusinessAccount";

function Signup() {
  const [isPersonal, setIsPersonal] = React.useState(true);
  return (
    <div className="overflow-y-scroll h-screen">
      <Container>
        <div className="p-5 max-w-[28rem] lg:max-w-full mx-auto">
          <div className="flex justify-between items-center mb-6">
            <img src={logo} alt="logo" className="w-40" />
            <p>
              <span className="hidden lg:inline">
                Already have an account?{" "}
              </span>
              <Link to="/signin" className="underline text-blue-300">
                Sign in
              </Link>
            </p>
          </div>
          <div className="lg:flex gap-5">
            <div className="hidden lg:block">
              <img
                src={isPersonal ? personalImage : businessImage}
                alt="personal"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="lg:max-w-[28rem] mx-auto pb-10">
              <h2 className="text-xl font-medium mb-5">Create an account</h2>
              <div className="border border-gray-200 rounded-full flex justify-center p-[0.15rem] mb-4">
                <Button
                  intent="iconText"
                  size="none"
                  className={cn(
                    "p-1 rounded-full flex-1 flex items-center justify-center transition-all duration-300 ease-in-out",
                    {
                      "bg-gray-600 text-white": isPersonal,
                    }
                  )}
                  onClick={() => setIsPersonal(true)}
                >
                  Personal
                </Button>
                <Button
                  intent="iconText"
                  size="none"
                  className={cn(
                    "p-1 rounded-full flex-1 flex items-center justify-center transition-all duration-300 ease-in-out",
                    {
                      "bg-gray-600 text-white": !isPersonal,
                    }
                  )}
                  onClick={() => setIsPersonal(false)}
                >
                  Business
                </Button>
              </div>
              {isPersonal ? <PersonalAccount /> : <BusinessAccount />}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Signup;
