import React, { useEffect, useState } from "react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import {
  resetPhoneVerification,
  setError,
  updateFieldHandler,
  validateFieldHandler,
} from "../../sellingAccountSlice";
import { VerificationType } from "../schema/sellingAccountSchema";
import { toast } from "react-toastify";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../../sellingAccountApiSlice";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "../../../../utils/mergeClasses";
import { ErrorResponse } from "react-router-dom";

function EmailVerification() {
  const [codeSent, setCodeSent] = React.useState(false);
  const [sendCodeDisabled, setSendCodeDisabled] = React.useState(true);
  const [resendDisabled, setResendDisabled] = React.useState(true);
  const dispatch = useDispatch();
  const { data, errors } = useSelector(
    (state: RootState) => state.sellingAccount
  );
  const [sendOTP] = useSendOTPMutation();
  const [verifyOTP] = useVerifyOTPMutation();
  const { email, emailOTP } = data;
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

  useEffect(() => {
    if (email.length !== 0 && !errors.email) {
      setSendCodeDisabled(false);
    } else {
      setSendCodeDisabled(true);
    }
  }, [email, errors.email]);

  const onGoBack = () => {
    dispatch(resetPhoneVerification());
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFieldHandler({ field: "email", value: e.target.value }));
    dispatch(validateFieldHandler({ field: "email", value: e.target.value }));
  };

  const emailOtpChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const otpRegex = /^[0-9\b]+$/;
    const { value } = e.target;
    if (value !== "" && !otpRegex.test(value)) return;
    if (e.target.value.length > 6) return;
    dispatch(updateFieldHandler({ field: "emailOTP", value: e.target.value }));
    dispatch(
      validateFieldHandler({ field: "emailOTP", value: e.target.value })
    );
  };

  const codeSentHandler = async () => {
    // send the code
    try {
      await sendOTP({
        type: VerificationType.email,
        target: email,
      }).unwrap();
      toast.success("Code sent successfully");
      setCodeSent(true);
    } catch (error) {
      console.error(error);
      const err = error as ErrorResponse;
      toast.error(err.data.message || "Failed to send the code");
    }
  };

  const verifyEmailHandler = async () => {
    try {
      // verify the email
      await verifyOTP({
        type: VerificationType.email,
        target: email,
        code: emailOTP,
      }).unwrap();
      toast.success("Email verified successfully");
      dispatch(setError({ field: "emailOTP", error: "" }));
      dispatch(updateFieldHandler({ field: "emailVerified", value: true }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify the email");
      dispatch(
        setError({
          field: "emailOTP",
          error: "Security code is'nt looks good. Please try again.",
        })
      );
    }
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-medium mb-3">Then, verify your email.</h3>
      <p className="mb-5">
        To fully verify you as an carCheck seller, we need you to add and verify
        a email. if you willing to continue with the registered email, please
        leave it as it is.
      </p>
      <p className="mb-3">
        To confirm your email, we’ll send a security code to:
      </p>
      {!codeSent ? (
        <>
          <Input
            type="string"
            className="max-w-md block h-10 border-gray-200 rounded-md p-0 pl-3 focus:outline-none font-medium bg-gray-50"
            value={email}
            onChange={emailChangeHandler}
          />
          {errors.email && (
            <p className="text-red-300 text-sm">{errors.email}</p>
          )}
          <div className="flex gap-5">
            <Button
              intent="secondary"
              className="rounded-full  mt-5"
              onClick={onGoBack}
            >
              Back
            </Button>
            <Button
              intent="primary"
              className={cn(
                "rounded-full mt-5",
                sendCodeDisabled ? "opacity-70" : "opacity-100"
              )}
              disabled={sendCodeDisabled}
              onClick={codeSentHandler}
            >
              Email me
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-3">
            We sent a email with a security code to{" "}
            <span className="font-medium">{email}</span>. this code will be
            active for 20 miniutes.
          </p>
          <label className="max-w-md border border-gray-200 flex items-center p-2 rounded-md bg-gray-50">
            <span className="text-gray-300 font-medium">OTP</span>
            <Input
              type="string"
              className="border-none rounded-md p-0 pl-3 focus:outline-none font-medium"
              value={emailOTP}
              onChange={emailOtpChangeHandler}
            />
          </label>
          {
            <p className="text-red-300 text-sm">
              {errors.emailOTP && errors.emailOTP}
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
              onClick={verifyEmailHandler}
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
              It's not you? Change email
            </Button>
          </div>
          <p className="mt-5 text-gray-300">
            You can resend the security code in {countdown} seconds
          </p>
        </>
      )}

      <p className="bg-gray-100 py-2 px-2 mt-5 text-gray-300">
        By requesting a verification code, you confirm that this is your email
        and consent to receive an automated email.
      </p>
    </div>
  );
}

export default EmailVerification;
