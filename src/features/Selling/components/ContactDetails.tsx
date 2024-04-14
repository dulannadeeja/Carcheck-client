import React from "react";
import Input from "../../../components/ui/Input";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateFieldHandler, validateFieldHandler } from "../inspectionReqSlice";

function ContactDetails() {
  const dispatch = useDispatch();
  const [mobile, setMobile] = React.useState<string>("");
  const { errors } = useSelector((state: RootState) => state.inspectionReq);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) return;
    if (e.target.value === "0") return;
    if (e.target.value.length > 9) return;
    setMobile(e.target.value);
    // set the mobile number to the state
    dispatch(updateFieldHandler({ field: "contactNumber", value: e.target.value }));
    // validate the mobile number
    dispatch(validateFieldHandler({ field: "contactNumber", value: e.target.value }));
  };
  return (
    <div className="mt-6 grid grid-cols-12 gap-5">
      <div className="col-span-6">
        <h2 className="text-lg font-semibold">Contact details</h2>
        <p className="text-gray-300">
          Please provide your contact details so that we can reach out to you.
        </p>
      </div>
      <div className="col-span-6">
        <p className="text-sm font-medium col-span-5 mb-2">Mobile</p>
        <label className="max-w-48 border border-gray-150 flex items-center p-2 rounded-md bg-gray-50">
          <span className="text-gray-300 font-medium">+94</span>
          <Input
            type="string"
            className="border-none rounded-md p-0 pl-3 focus:outline-none"
            value={mobile}
            onChange={handleChange}
          />
        </label>
        {errors.contactNumber && (
          <p className="text-red-300 text-sm mt-1">{errors.contactNumber}</p>
        )}
      </div>
    </div>
  );
}

export default ContactDetails;
