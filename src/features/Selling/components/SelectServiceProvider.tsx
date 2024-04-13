import { error } from "console";
import React, { useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFieldHandler,
  validateFieldHandler,
} from "../inspectionReqSlice";

const serviceProviders = [
  "AMW Automall",
  "Singer Sri Lanka",
  "Toyota Lanka",
  "Hyundai Lanka",
  "Mercedes Benz",
  "Nissan Lanka",
  "Micro Cars",
  "Kia Motors",
  "Audi Lanka",
  "BMW Lanka",
  "Volkswagen Lanka",
  "Porsche Lanka",
  "Jaguar Lanka",
  "Land Rover",
];

const branchNetwork = [
  "Colombo",
  "Kandy",
  "Galle",
  "Jaffna",
  "Kurunegala",
  "Anuradhapura",
  "Gampaha",
  "Matara",
  "Negombo",
  "Ratnapura",
  "Trincomalee",
  "Batticaloa",
  "Ampara",
  "Badulla",
  "Monaragala",
];

function SelectServiceProvider() {
  const dispatch = useDispatch();
  const [serviceProviderActive, setServiceProviderActive] =
    useState<boolean>(false);
  const [branchActive, setBranchActive] = useState<boolean>(false);
  const { errors, serviceBranch, serviceProvider } = useSelector(
    (state: RootState) => state.inspectionReq
  );

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    console.log(name, value);
    if (name === "serviceProvider") {
      dispatch(updateFieldHandler({ field: "serviceBranch", value: "" }));
      dispatch(validateFieldHandler({ field: "serviceBranch", value: "" }));
    }
    // set the value to the state
    dispatch(updateFieldHandler({ field: name, value }));
    dispatch(validateFieldHandler({ field: name, value }));
  };

  return (
    <div className="mt-6 grid grid-cols-12 gap-5">
      <div className="col-span-6">
        <h2 className="text-lg font-semibold">Choose a service provider</h2>
        <p className="text-gray-300">
          We are working with the best service providers in the country. Choose
          one that suits you.
        </p>
      </div>
      <div className="col-span-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium col-span-6">Service provider</p>
          <div
            className="relative col-span-6 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
            onClick={() => setServiceProviderActive(!serviceProviderActive)}
          >
            <p>{serviceProvider}</p>
            <IoChevronDownOutline className="text-base" />
            {serviceProviderActive && (
              <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto z-10">
                {serviceProviders.map((provider) => (
                  <p
                    key={provider}
                    className="cursor-pointer hover:bg-gray-50 py-2 px-4"
                    onClick={() => {
                      handleChange({
                        name: "serviceProvider",
                        value: provider,
                      });
                    }}
                  >
                    {provider}
                  </p>
                ))}
              </div>
            )}
          </div>
          {errors.serviceProvider && (
            <p className="text-red-300 text-sm">{errors.serviceProvider}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium col-span-6">Branch</p>
          <div
            className="relative col-span-6 flex justify-between items-center border border-gray-200 px-2 py-1 rounded-md bg-gray-50 h-10"
            onClick={() => setBranchActive(!branchActive)}
          >
            <p>{serviceBranch}</p>
            <IoChevronDownOutline className="text-base" />
            {branchActive && (
              <div className="flex-col bg-white absolute left-0 shadow-lg border right-0 top-8 rounded-md flex max-h-[20rem] overflow-auto z-10">
                {branchNetwork.map((branch) => (
                  <p
                    key={branch}
                    className="cursor-pointer hover:bg-gray-50 py-2 px-4"
                    onClick={() => {
                      handleChange({ name: "serviceBranch", value: branch });
                    }}
                  >
                    {branch}
                  </p>
                ))}
              </div>
            )}
          </div>
          {errors.serviceBranch && (
            <p className="text-red-300 text-sm">{errors.serviceBranch}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectServiceProvider;
