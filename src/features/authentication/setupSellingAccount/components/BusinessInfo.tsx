import { useEffect, useState } from "react";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { AccountType, typeOfOwnershipArray } from "../../auth";
import Input from "../../../../components/ui/Input";
import { IoChevronDownOutline } from "react-icons/io5";
import {
  setErrors,
  updateFieldHandler,
  validateFieldHandler,
} from "../../sellingAccountSlice";
import { cn } from "../../../../utils/mergeClasses";
import Button from "../../../../components/ui/Button";
import { ZodIssue } from "zod";
import { businessInfoSchema } from "../schema/sellingAccountSchema";
import { useNavigate } from "react-router-dom";

function BusinessInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, errors } = useSelector(
    (state: RootState) => state.sellingAccount
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const onContinue = () => {
    // validate business info
    const businessInfoErrors = ValidateBusinessInfo();
    if (businessInfoErrors) {
      dispatch(
        setErrors({
          ...errors,
          businessInfo: businessInfoErrors,
        })
      );
      return;
    }
    // set business info as completed
    dispatch(
      updateFieldHandler({ field: "businessInfoVerified", value: true })
    );
    // navigate to the next step
    navigate("/selling/register/financial-info");
  };

  const onBack = () => {
    dispatch(
      updateFieldHandler({ field: "businessInfoVerified", value: false })
    );
    dispatch(
      updateFieldHandler({ field: "businessAddressVerified", value: false })
    );
  };

  const handleBusinessInfoValidationErrors = (issues: ZodIssue[]) => {
    const businessInfoErrors: typeof errors.businessInfo = {
      businessName: "",
      businessRegNo: "",
      businessWebsite: "",
      ownershipType: "",
    };
    issues.forEach((issue) => {
      if (issue.path.length > 1) {
        const parentKey = issue.path[0] as keyof typeof errors.businessInfo;
        const parent = businessInfoErrors[parentKey];
        const updatedParent = {
          ...(parent as unknown as object),
          [issue.path[1]]: issue.message,
        };

        businessInfoErrors[parentKey] = updatedParent as never;
      } else {
        const key = issue.path[0] as keyof typeof errors.businessInfo;
        businessInfoErrors[key] = issue.message as never;
      }
    });
    return businessInfoErrors;
  };

  const ValidateBusinessInfo = () => {
    // validate business info
    const result = businessInfoSchema.safeParse(data.businessInfo);
    if (!result.success) {
      return handleBusinessInfoValidationErrors(result.error.issues);
    }
    return false;
  };

  const onChangeHandler = (field: string, value: string) => {
    dispatch(updateFieldHandler({ field, value }));
    dispatch(validateFieldHandler({ field, value }));
  };

  return (
    <div>
      <div>
        <h1 className="text-xl font-medium mb-3">
          One more, tell us about your business
        </h1>
        <p className="mb-5">
          We need some information about your business to create your account.
          ensure that the information you provide is inline with the information
          on your business registration documents.
        </p>
        <h2 className="mb-3">Business details</h2>
        <div className="flex flex-col gap-3">
          <div>
            <Input
              type="string"
              className="border-gray-200 bg-gray-50 h-10 max-w-md rounded-md p-0 pl-3 focus:outline-none font-medium"
              placeholder="Legal business name"
              value={data.businessInfo.businessName}
              onChange={(e) =>
                onChangeHandler("businessInfo.businessName", e.target.value)
              }
            />
            {errors.businessInfo?.businessName && (
              <p className="text-red-300 text-sm">
                {errors.businessInfo.businessName}
              </p>
            )}
          </div>
          <div>
            <Input
              type="string"
              className="border-gray-200 bg-gray-50 h-10 max-w-md rounded-md p-0 pl-3 focus:outline-none font-medium"
              placeholder="Business registration number"
              value={data.businessInfo.businessRegNo}
              onChange={(e) =>
                onChangeHandler("businessInfo.businessRegNo", e.target.value)
              }
            />
            {errors.businessInfo?.businessRegNo && (
              <p className="text-red-300 text-sm">
                {errors.businessInfo.businessRegNo}
              </p>
            )}
          </div>
          <div>
            <div
              className="relative col-span-7 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10 max-w-md"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <p
                className={cn("font-medium pl-1", {
                  "text-gray-400": !data.businessInfo.ownershipType,
                  "text-gray-800": data.businessInfo.ownershipType,
                })}
              >
                {data.businessInfo.ownershipType || "Type of ownership"}
              </p>
              <IoChevronDownOutline className="text-base" />
              {showDropdown && (
                <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
                  {typeOfOwnershipArray.map((ownership) => (
                    <p
                      key={ownership}
                      className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                      onClick={() => {
                        onChangeHandler(
                          "businessInfo.ownershipType",
                          ownership
                        );
                        setShowDropdown(false);
                      }}
                    >
                      {ownership}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {errors.businessInfo?.ownershipType && (
              <p className="text-red-300 text-sm">
                {errors.businessInfo.ownershipType}
              </p>
            )}
          </div>
          <div>
            <Input
              type="string"
              className="border-gray-200 bg-gray-50 h-10 max-w-md rounded-md p-0 pl-3 focus:outline-none font-medium"
              placeholder="Business website URL (optional)"
              value={data.businessInfo.businessWebsite}
              onChange={(e) =>
                onChangeHandler("businessInfo.businessWebsite", e.target.value)
              }
            />
            {errors.businessInfo?.businessWebsite && (
              <p className="text-red-300 text-sm">
                {errors.businessInfo.businessWebsite}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <Button
            intent={"secondary"}
            className="rounded-full"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            intent={"primary"}
            className="rounded-full"
            onClick={onContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BusinessInfo;
