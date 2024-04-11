import React, { useState } from "react";
import Input from "../../../components/ui/Input";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import googleLogo from "../../../assets/images/google.png";
import facebookLogo from "../../../assets/images/facebook.png";
import appleLogo from "../../../assets/images/apple-logo.png";
import {
  PersonalUserFormFields,
  personalUserSchema,
  validateField,
} from "../schema/personalUserSchema";
import { PersonalFormErrors } from "../schema/personalUserSchema";
import { ZodIssue } from "zod";
import { AccountType } from "../auth";

function PersonalAccount({ handleSignup }: { handleSignup: (data:PersonalUserFormFields) => Promise<void>}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<PersonalFormErrors>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData: PersonalUserFormFields = {
      acoountType: e.currentTarget.accountType.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      firstName: e.currentTarget.firstName.value,
      lastName: e.currentTarget.lastName.value,
    };

    const result = personalUserSchema.safeParse(formData);

    if (result.success) {
      // Form is valid
      await handleSignup(result.data);
    } else {
      // Form is invalid, map Zod errors to the state
      const newErrors: PersonalFormErrors = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      };
      result.error.issues.forEach((issue: ZodIssue) => {
        const fieldName = issue.path[0] as keyof PersonalFormErrors;
        newErrors[fieldName] = issue.message;
      });
      setErrors(newErrors);
    }

    setIsSubmitting(false);
  };

  const onChangeHandler = (
    name: keyof PersonalUserFormFields,
    value: string
  ) => {
    // validate the field and set the errors state
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
          <input type="hidden" name="accountType" value={AccountType.buyerPersonal} />
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-1 mb-3">
            <Input
              name="firstName"
              type="text"
              placeholder="First Name"
              className="border-gray-200 bg-gray-50 w-full placeholder:text-gray-300"
              onChange={(e) =>
                onChangeHandler(
                  e.target.name as keyof PersonalUserFormFields,
                  e.target.value
                )
              }
            />
            {errors.firstName && (
              <p className="text-red-300 text-sm">{errors["firstName"]}</p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1 mb-3">
            <Input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="border-gray-200 bg-gray-50 w-full placeholder:text-gray-300"
              onChange={(e) =>
                onChangeHandler(
                  e.target.name as keyof PersonalUserFormFields,
                  e.target.value
                )
              }
            />
            {errors.lastName && (
              <p className="text-red-300 text-sm">{errors["lastName"]}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 mb-3">
          <Input
            name="email"
            type="text"
            placeholder="Email"
            className="w-full border-gray-200 bg-gray-50 placeholder:text-gray-300"
            onChange={(e) =>
              onChangeHandler(
                e.target.name as keyof PersonalUserFormFields,
                e.target.value
              )
            }
          />
          {errors.email && (
            <p className="text-red-300 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 mb-3">
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border-gray-200 bg-gray-50 pr-10 placeholder:text-gray-300"
              onChange={(e) =>
                onChangeHandler(
                  e.target.name as keyof PersonalUserFormFields,
                  e.target.value
                )
              }
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

          {errors.password && (
            <p className="text-red-300 text-sm">{errors.password}</p>
          )}
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
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create personal account"}
        </Button>
      </form>
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
