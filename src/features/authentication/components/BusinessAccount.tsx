import React, { useState } from "react";
import Input from "../../../components/ui/Input";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import BusinessType from "./BusinessType";
import {
  BusinessUserFormErrors,
  BusinessUserFormFields,
  businessUserSchema,
  validateField,
} from "../schema/businessUserSchema";
import { ZodIssue } from "zod";
import { AccountType } from "../auth";

function BusinessAccount({
  handleSignup,
}: {
  handleSignup: (data: BusinessUserFormFields) => Promise<void>;
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<BusinessUserFormErrors>({
    email: "",
    businessName: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData: BusinessUserFormFields = {
      acoountType: e.currentTarget.accountType.value,
      businessName: e.currentTarget.businessName.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      firstName: e.currentTarget.firstName.value,
      lastName: e.currentTarget.lastName.value
    };

    const result = businessUserSchema.safeParse(formData);

    if (result.success) {
      // Form is valid
      await handleSignup(result.data);
    } else {
      // Form is invalid, map Zod errors to the state
      const newErrors: BusinessUserFormErrors = {
        email: "",
        businessName: "",
        password: "",
        firstName: "",
        lastName: "",
      };
      result.error.issues.forEach((issue: ZodIssue) => {
        const fieldName = issue.path[0] as keyof BusinessUserFormErrors;
        newErrors[fieldName] = issue.message;
      });
      setErrors(newErrors);
    }

    setIsSubmitting(false);
  };

  const onChangeHandler = (
    name: keyof BusinessUserFormFields,
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
      <p className="mb-4">
        Continue to register as <span className="font-medium">business</span>,
        if you have a registered <span className="font-medium"></span>spare
        parts business, car dealership or a automobile service point.
      </p>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          type="hidden"
          name="accountType"
          value={AccountType.buyerBusiness}
          readOnly
        />
        <div className="flex gap-4 mb-3">
          <div className="flex flex-1 flex-col gap-1 mb-3">
            <Input
              name="firstName"
              type="text"
              placeholder="First Name"
              className="border-gray-200 bg-gray-50 w-full placeholder:text-gray-300"
              onChange={(e) =>
                onChangeHandler(
                  e.target.name as keyof BusinessUserFormFields,
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
                  e.target.name as keyof BusinessUserFormFields,
                  e.target.value
                )
              }
            />
            {errors.lastName && (
              <p className="text-red-300 text-sm">{errors["lastName"]}</p>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1 mb-3">
          <Input
            name="businessName"
            type="text"
            placeholder="Business Name"
            className="border-gray-200 bg-gray-50 w-full placeholder:text-gray-300"
            onChange={(e) =>
              onChangeHandler(
                e.target.name as keyof BusinessUserFormFields,
                e.target.value
              )
            }
          />
          {errors.businessName && (
            <p className="text-red-300 text-sm">{errors["businessName"]}</p>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1 mb-3">
          <Input
            name="email"
            type="email"
            placeholder="Business Email"
            className="border-gray-200 bg-gray-50 w-full placeholder:text-gray-300"
            onChange={(e) =>
              onChangeHandler(
                e.target.name as keyof BusinessUserFormFields,
                e.target.value
              )
            }
          />
          {errors.email && (
            <p className="text-red-300 text-sm">{errors["email"]}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 mb-3">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border-gray-200 bg-gray-50 pr-10 placeholder:text-gray-300"
              name="password"
              onChange={(e) =>
                onChangeHandler(
                  e.target.name as keyof BusinessUserFormFields,
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
            <p className="text-red-300 text-sm">{errors["password"]}</p>
          )}
        </div>
        <Button
          type="submit"
          intent="primary"
          className="rounded-full w-full flex items-center justify-center mt-4 mb-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Please wait..." : "Create a business account"}
        </Button>
      </form>
    </div>
  );
}

export default BusinessAccount;
