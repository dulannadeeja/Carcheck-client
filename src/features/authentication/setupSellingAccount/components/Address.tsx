import React, { useCallback, useEffect, useState } from "react";
import Input from "../../../../components/ui/Input";
import { IoChevronDownOutline } from "react-icons/io5";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  divisionsOfSrilanka,
  getCitiesOfDivision,
  TCitiesOfDivision,
  TDivision,
} from "../../../locationFilter/location";
import {
  setErrors,
  updateFieldHandler,
  validateFieldHandler,
} from "../../sellingAccountSlice";
import { cn } from "../../../../utils/mergeClasses";
import { businessAddressSchema } from "../schema/sellingAccountSchema";
import { ZodIssue } from "zod";
import Button from "../../../../components/ui/Button";
import { AccountType } from "../../auth";
import { useNavigate } from "react-router-dom";

function Address() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [citiesOfDivision, setCitiesOfDivision] = useState<TCitiesOfDivision>(
    []
  );
  const { data, errors } = useSelector(
    (state: RootState) => state.sellingAccount
  );
  const { businessAddress } = data;
  const { street, streetLine2, city, division, zip } = businessAddress;
  const [showDivisionDropdown, setShowDivisionDropdown] = React.useState(false);
  const [showCityDropdown, setShowCityDropdown] = React.useState(false);

  const clearCityFromState = useCallback(() => {
    dispatch(
      validateFieldHandler({ field: "businessAddress.city", value: "" })
    );
    dispatch(updateFieldHandler({ field: "businessAddress.city", value: "" }));
  }, [dispatch]);

  const clearZipCodeFromState = useCallback(() => {
    dispatch(validateFieldHandler({ field: "businessAddress.zip", value: "" }));
    dispatch(updateFieldHandler({ field: "businessAddress.zip", value: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (division !== "") {
      const cities = getCitiesOfDivision(division as TDivision);
      setCitiesOfDivision(cities as unknown as TCitiesOfDivision);
    } else {
      setCitiesOfDivision([]);
    }
  }, [division]);

  const handleDivisionChange = (value: string) => {
    dispatch(updateFieldHandler({ field: "businessAddress.division", value }));
    dispatch(
      validateFieldHandler({ field: "businessAddress.division", value })
    );
    setShowDivisionDropdown(false);
    if (division !== "") {
      clearCityFromState();
      clearZipCodeFromState();
      const cities = getCitiesOfDivision(division as TDivision);
      setCitiesOfDivision(cities as unknown as TCitiesOfDivision);
    }
  };

  const onBack = () => {
    dispatch(
      updateFieldHandler({ field: "personalInfoVerified", value: false })
    );
    dispatch(
      updateFieldHandler({ field: "businessAddressVerified", value: false })
    );
    console.log("Back");
  };

  const onContinue = () => {
    const addressErrors = validateAddress();
    if (addressErrors) {
      dispatch(
        updateFieldHandler({ field: "businessAddressVerified", value: false })
      );
      dispatch(setErrors({ businessAddress: addressErrors }));
      return;
    }
    dispatch(
      updateFieldHandler({ field: "businessAddressVerified", value: true })
    );
    // if account type is personal, navigate to the next step
    if(data.accountType === AccountType.sellerPersonal) {
      navigate("/selling/register/financial-info");
    }
  };

  const validateAddress = () => {
    const result = businessAddressSchema.safeParse(businessAddress) as { 
      success: boolean; 
      error: { issues: ZodIssue[] },
      data: typeof businessAddress
   };
    if (!result.success) {
      const addressErrors = handleAddressValidationErrors(result.error.issues);
      return addressErrors;
    }
    return false;
  };

  const handleAddressValidationErrors = (issues: ZodIssue[]) => {
    const addressErrors: typeof errors.businessAddress = {
      street: "",
      streetLine2: "",
      city: "",
      division: "",
      zip: "",
    };
    issues.forEach((issue) => {
      if (issue.path.length > 1) {
        const parentKey = issue.path[0] as keyof typeof errors.businessAddress;
        const parent = addressErrors[parentKey];
        const updatedParent = {
          ...(parent as unknown as object),
          [issue.path[1]]: issue.message,
        };
        addressErrors[parentKey] = updatedParent as never;
      } else {
        const key = issue.path[0] as keyof typeof errors.businessAddress;
        addressErrors[key] = issue.message as never;
      }
    });
    return addressErrors;
  };

  const handleCityChange = ({
    city,
    zipCode,
  }: {
    city: string;
    zipCode: string;
  }) => {
    dispatch(
      updateFieldHandler({ field: "businessAddress.city", value: city })
    );
    dispatch(
      validateFieldHandler({ field: "businessAddress.city", value: city })
    );
    setShowCityDropdown(false);

    // set zip code
    dispatch(
      updateFieldHandler({ field: "businessAddress.zip", value: zipCode })
    );
    dispatch(
      validateFieldHandler({ field: "businessAddress.zip", value: zipCode })
    );
  };

  return (
    <div className="">
      <h1 className="text-xl font-medium mb-3">Then, Provide your address</h1>
      <p className="mb-5">
        Providing your address will help us to provide you with the best
        possible service. Please ensure that the address you provide is accurate
        and up to date.
      </p>
      <p className="mb-3">Your residential address </p>
      <div className="flex flex-col gap-3">
        <div>
          <Input
            type="string"
            className="border-gray-200 h-10 bg-gray-50 mb-1 max-w-md rounded-md p-0 pl-3 focus:outline-none font-medium"
            placeholder="Street and number"
            value={street}
            onChange={(e) => {
              dispatch(
                updateFieldHandler({
                  field: "businessAddress.street",
                  value: e.target.value,
                })
              );
              dispatch(
                validateFieldHandler({
                  field: "businessAddress.street",
                  value: e.target.value,
                })
              );
            }}
          />
          {errors.businessAddress?.street && (
            <p className="text-red-300 text-sm">
              {errors["businessAddress"]["street"]}
            </p>
          )}
        </div>
        <div>
          <Input
            type="string"
            className="border-gray-200 h-10 bg-gray-50 mb-3 max-w-md rounded-md p-0 pl-3 focus:outline-none font-medium"
            placeholder="More address details (optional)"
            value={streetLine2}
            onChange={(e) => {
              dispatch(
                updateFieldHandler({
                  field: "businessAddress.streetLine2",
                  value: e.target.value,
                })
              );
              dispatch(
                validateFieldHandler({
                  field: "businessAddress.streetLine2",
                  value: e.target.value,
                })
              );
            }}
          />
          {errors.businessAddress?.streetLine2 && (
            <p className="text-red-300 text-sm">
              {errors["businessAddress"]["streetLine2"]}
            </p>
          )}
        </div>
        <div className="flex flex-col max-w-md gap-3 mb-3">
          {/* division */}
          <div className="flex-1 flex gap-1 flex-col">
            <div
              className="relative flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
              onClick={() => {
                setShowDivisionDropdown(!showDivisionDropdown);
                setShowCityDropdown(false);
              }}
            >
              <p
                className={cn("font-medium", {
                  "text-gray-400": !division,
                })}
              >
                {division || "Division"}
              </p>
              <IoChevronDownOutline className="text-base" />
              {showDivisionDropdown && (
                <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
                  {divisionsOfSrilanka.map((division) => (
                    <p
                      key={division}
                      className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                      onClick={() => {
                        handleDivisionChange(division);
                      }}
                    >
                      {division}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {errors.businessAddress?.division && (
              <p className="text-red-300 text-sm">
                {errors["businessAddress"]["division"]}
              </p>
            )}
          </div>

          {/* city */}
          <div className="flex-1 flex gap-1 flex-col">
            <div
              className="relative flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
              onClick={() => {
                setShowDivisionDropdown(false);
                setShowCityDropdown(!showCityDropdown);
              }}
            >
              <p
                className={cn("font-medium", {
                  "text-gray-400": !division,
                })}
              >
                {city || "City"}
              </p>
              <IoChevronDownOutline className="text-base" />
              {showCityDropdown && (
                <div className="flex-col bg-white z-10 absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto">
                  {citiesOfDivision.map((city) => (
                    <p
                      key={city.city}
                      className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                      onClick={() => {
                        handleCityChange({
                          city: city.city,
                          zipCode: city.code,
                        });
                      }}
                    >
                      {city.city}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {errors.businessAddress?.city && (
              <p className="text-red-300 text-sm">
                {errors["businessAddress"]["city"]}
              </p>
            )}
          </div>

          {/* zip code */}
          <div className="flex-1 flex gap-1 flex-col">
            <div className="relative  flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 pointer-events-none h-10">
              <p
                className={cn("font-medium", {
                  "text-gray-400": !division,
                })}
              >
                {zip || "Zip code"}
              </p>
            </div>
            {errors.businessAddress?.zip && (
              <p className="text-red-300 text-sm">
                {errors["businessAddress"]["zip"]}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <Button intent="secondary" className="rounded-full" onClick={onBack}>
          Back
        </Button>
        <Button intent="primary" className="rounded-full" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default Address;
