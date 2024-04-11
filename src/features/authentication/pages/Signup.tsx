import React, { useEffect } from "react";
import logo from "../../../assets/brand/logo.svg";
import { ErrorResponse, Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import PersonalAccount from "../components/PersonalAccount";
import { cn } from "../../../utils/mergeClasses";
import personalImage from "../../../assets/images/personal.jpg";
import Container from "../../../components/ui/Container";
import businessImage from "../../../assets/images/business.jpg";
import BusinessAccount from "../components/BusinessAccount";
import { useSigninMutation, useSignupMutation } from "../authApiSlice";
import { setUser } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { PersonalUserFormFields } from "../schema/personalUserSchema";
import { BusinessUserFormFields } from "../schema/businessUserSchema";
import { toast } from "react-toastify";

function Signup() {
  const [isPersonal, setIsPersonal] = React.useState(true);

  const { user } = useSelector((state: RootState) => state.auth);
  const [signup] = useSignupMutation();
  const [signIn] = useSigninMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // if user is already logged in, redirect to home page
      // navigate("/");
    }
  });

  // handle signup form submission
  const handleSignup = async (
    data: PersonalUserFormFields | BusinessUserFormFields
  ) => {
    try {
      await signup(data).unwrap();
      toast.success("Account created successfully");
      const response = await signIn(data).unwrap();
      dispatch(setUser({ ...response }));
      navigate("/");
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      console.error(errorResponse.data.message);
      toast.error(errorResponse.data.message);
    }
  };

  return (
    <>
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
                {isPersonal ? (
                  <PersonalAccount handleSignup={handleSignup} />
                ) : (
                  <BusinessAccount handleSignup={handleSignup} />
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Signup;
