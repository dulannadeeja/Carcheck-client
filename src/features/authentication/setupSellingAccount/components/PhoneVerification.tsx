import React, { useEffect, useState } from "react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  setError,
  updateFieldHandler,
  validateFieldHandler,
} from "../../sellingAccountSlice";
import { cn } from "../../../../utils/mergeClasses";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../../sellingAccountApiSlice";
import { toast } from "react-toastify";
import { VerificationType } from "../schema/sellingAccountSchema";
import { ErrorResponse } from "../../../../types";

function PhoneVerification() {
  const [codeSent, setCodeSent] = React.useState(false);
  const [sendCodeDisabled, setSendCodeDisabled] = React.useState(true);
  const [resendDisabled, setResendDisabled] = React.useState(true);
  const dispatch = useDispatch();
  const { data, errors } = useSelector(
    (state: RootState) => state.sellingAccount
  );
  const [sendOTP] = useSendOTPMutation();
  const [verifyOTP] = useVerifyOTPMutation();
  const { phone, phoneOTP } = data;
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    if (countdown > 0) {
      setResendDisabled(true);
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  useEffect(()=>{
    setCountdown(20);
  },[])

  useEffect(() => {
    if (phone.length === 9 && !errors.phone) {
      setSendCodeDisabled(false);
    } else {
      setSendCodeDisabled(true);
    }
  }, [phone, errors.phone]);

  const phoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneRegex = /^[0-9\b]+$/;
    const { value } = e.target;
    if (value !== "" && !phoneRegex.test(value)) return;
    if (e.target.value.length > 9) return;
    dispatch(updateFieldHandler({ field: "phone", value: e.target.value }));
    dispatch(validateFieldHandler({ field: "phone", value: e.target.value }));
  };

  const phoneOtpChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneRegex = /^[0-9\b]+$/;
    const { value } = e.target;
    if (value !== "" && !phoneRegex.test(value)) return;
    if (e.target.value.length > 6) return;
    dispatch(updateFieldHandler({ field: "phoneOTP", value: e.target.value }));
    dispatch(
      validateFieldHandler({ field: "phoneOTP", value: e.target.value })
    );
  };

  const codeSentHandler = async () => {
    // send the code
    try {
      await sendOTP({
        type: VerificationType.phone,
        target: phone,
      }).unwrap();
      toast.success("Code sent successfully");
      setCodeSent(true);
    } catch (error) {
      console.error(error);
      
      const err = error as ErrorResponse;
      toast.error(err.data.message || "Failed to send the code");
    }
  };

  const verifyPhoneHandler = async () => {
    try {
      // verify the phone number
      await verifyOTP({
        type: VerificationType.phone,
        target: phone,
        code: phoneOTP,
      }).unwrap();
      toast.success("Phone number verified successfully");
      dispatch(setError({ field: "phoneOTP", error: "" }));
      dispatch(updateFieldHandler({ field: "phoneVerified", value: true }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify the phone number");
      dispatch(
        setError({
          field: "phoneOTP",
          error: "Security code is'nt looks good. Please try again.",
        })
      );
    }
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-medium mb-3">
        First, verify your phone number.
      </h3>
      <p className="mb-5">
        To fully verify you as an carCheck seller, we need you to add and verify
        a phone number.
      </p>
      <p className="mb-3">
        To confirm your number, we’ll send a security code to:
      </p>
      {!codeSent ? (
        <>
          <label className="max-w-md border border-gray-150 flex items-center p-2 rounded-md bg-gray-50">
            <span className="text-gray-300 font-medium">+94</span>
            <Input
              type="string"
              className="border-none rounded-md p-0 pl-3 focus:outline-none font-medium"
              value={phone}
              onChange={phoneChangeHandler}
            />
          </label>
          {errors.phone && (
            <p className="text-red-300 text-sm">{errors.phone}</p>
          )}
          <Button
            intent="primary"
            className={cn(
              "rounded-full mt-5",
              sendCodeDisabled ? "opacity-70" : "opacity-100"
            )}
            disabled={sendCodeDisabled}
            onClick={codeSentHandler}
          >
            Text me
          </Button>
        </>
      ) : (
        <>
          <p className="mb-3">
            We sent a text with a security code to{" "}
            <span className="font-medium">+94 {phone}</span>. this code will be
            active for 20 miniutes.
          </p>
          <label className="max-w-md border border-gray-200 flex items-center p-2 rounded-md bg-gray-50">
            <span className="text-gray-300 font-medium">OTP</span>
            <Input
              type="string"
              className="border-none rounded-md p-0 pl-3 focus:outline-none font-medium"
              value={phoneOTP}
              onChange={phoneOtpChangeHandler}
            />
          </label>
          {
            <p className="text-red-300 text-sm">
              {errors.phoneOTP && errors.phoneOTP}
            </p>
          }
          <div className="flex gap-2">
            <Button
              intent="secondary"
              className={cn(
                "rounded-full mt-5",
                resendDisabled
                  ? "text-gray-300 cursor-pointer border-gray-300"
                  : "text-blue-300"
              )}
              onClick={() => {
                if (resendDisabled) return;
                setCountdown(20);
                setCodeSent(false);
              }}
            >
              Resend code
            </Button>
            <Button
              intent="primary"
              className="rounded-full mt-5"
              onClick={verifyPhoneHandler}
            >
              Continue
            </Button>
            <Button
              intent="iconText"
              className="rounded-full mt-5 font-medium text-blue-300 underline"
              onClick={() => {
                setCountdown(20);
                setCodeSent(false);
              }}
            >
              It's not you? Change number
            </Button>
          </div>
          <p className="mt-5 text-gray-300">
            You can resend the security code in {countdown} seconds
          </p>
        </>
      )}

      <p className="bg-gray-100 py-2 px-2 mt-5 text-gray-300">
        By requesting a text or a call, you confirm that this is your number and
        consent to receive an automated text or recorded message. Message or
        data rates may apply.
      </p>
    </div>
  );
}

export default PhoneVerification;
