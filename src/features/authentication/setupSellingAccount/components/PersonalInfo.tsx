import { useEffect } from "react";
import Input from "../../../../components/ui/Input";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrors,
  updateFieldHandler,
  validateFieldHandler,
} from "../../sellingAccountSlice";
import Button from "../../../../components/ui/Button";
import { ZodIssue } from "zod";
import { personalInfoSchema } from "../schema/sellingAccountSchema";
import { useNavigate } from "react-router-dom";

function PersonalInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, errors } = useSelector(
    (state: RootState) => state.sellingAccount
  );
  const { firstName, lastName, nationalId, drivingLicense, passportNo } =
    data.personalInfo;

  // set the user's initial first name and last name to the input fields
  useEffect(() => {
    dispatch(
      updateFieldHandler({
        field: "personalInfo.firstName",
        value: user?.firstName,
      })
    );
    dispatch(
      updateFieldHandler({
        field: "personalInfo.lastName",
        value: user?.lastName,
      })
    );
  }, [dispatch, user?.firstName, user?.lastName]);

  const onContinue = async () => {
    // validate personal info
    const errors = await validatePersonalInfo();
    if (errors) {
      dispatch(setErrors({ personalInfo: errors }));
      return;
    }
    // set personal info as completed
    dispatch(
      updateFieldHandler({ field: "personalInfoVerified", value: true })
    );
  };

  const onBack = () => {
    navigate("/selling/register");
  };

  const handlePersonalInfoValidationErrors = (issues: ZodIssue[]) => {
    const personalInfoErrors: typeof errors.personalInfo = {
      firstName: "",
      lastName: "",
      drivingLicense: "",
      nationalId: "",
      passportNo: "",
    };
    issues.forEach((issue) => {
      if (issue.path.length > 1) {
        const parentKey = issue.path[0] as keyof typeof errors.personalInfo;
        const parent = personalInfoErrors[parentKey];
        const updatedParent = {
          ...(parent as unknown as object),
          [issue.path[1]]: issue.message,
        };

        personalInfoErrors[parentKey] = updatedParent as never;
      } else {
        const key = issue.path[0] as keyof typeof errors.personalInfo;
        personalInfoErrors[key] = issue.message as never;
      }
    });
    return personalInfoErrors;
  };

  const validatePersonalInfo = async () => {
    const result = personalInfoSchema.safeParse(data.personalInfo);
    if (!result.success) {
      const errors = handlePersonalInfoValidationErrors(result.error.issues);
      return errors;
    }
    return false;
  };

  return (
    <div>
      <h1 className="text-xl font-medium mb-3">
        First, Provide your personal information
      </h1>
      <p className="mb-3">
        You will need to provide your personal information to verify your
        identity. make sure to provide accurate information to avoid any issues
        with your account.
      </p>
      <p className="mb-3">Personal information</p>
      <div className="flex flex-col gap-3">
        <div>
          <Input
            type="string"
            className="rounded-md p-0 pl-3 focus:outline-none font-medium max-w-md border-gray-200 bg-gray-50 h-10 mb-1"
            placeholder="First name"
            value={firstName}
            onChange={(e) => {
              dispatch(
                updateFieldHandler({
                  field: "personalInfo.firstName",
                  value: e.target.value,
                })
              );
              dispatch(
                validateFieldHandler({
                  field: "personalInfo.firstName",
                  value: e.target.value,
                })
              );
            }}
          />
          {errors.personalInfo?.firstName && (
            <p className="text-red-300 text-sm">
              {errors.personalInfo.firstName}
            </p>
          )}
        </div>
        <div>
          <Input
            type="string"
            className="rounded-md p-0 pl-3 focus:outline-none font-medium max-w-md border-gray-200 bg-gray-50 h-10 mb-1"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => {
              dispatch(
                updateFieldHandler({
                  field: "personalInfo.lastName",
                  value: e.target.value,
                })
              );
              dispatch(
                validateFieldHandler({
                  field: "personalInfo.lastName",
                  value: e.target.value,
                })
              );
            }}
          />
          {errors.personalInfo?.lastName && (
            <p className="text-red-300 text-sm">
              {errors.personalInfo.lastName}
            </p>
          )}
        </div>
        <div>
          <Input
            type="string"
            className="rounded-md p-0 pl-3 focus:outline-none font-medium max-w-md border-gray-200 bg-gray-50 h-10 mb-1"
            placeholder="National identity number"
            value={nationalId}
            onChange={(e) => {
              dispatch(
                updateFieldHandler({
                  field: "personalInfo.nationalId",
                  value: e.target.value,
                })
              );
              dispatch(
                validateFieldHandler({
                  field: "personalInfo.nationalId",
                  value: e.target.value,
                })
              );
            }}
          />
          {errors.personalInfo?.nationalId && (
            <p className="text-red-300 text-sm">
              {errors.personalInfo.nationalId}
            </p>
          )}
        </div>
        <div>
          <Input
            type="string"
            className="rounded-md p-0 pl-3 focus:outline-none font-medium max-w-md border-gray-200 bg-gray-50 h-10 mb-1"
            placeholder="Driving license number (optional)"
            value={drivingLicense}
            onChange={(e) => {
              dispatch(
                updateFieldHandler({
                  field: "personalInfo.drivingLicense",
                  value: e.target.value,
                })
              );
              dispatch(
                validateFieldHandler({
                  field: "personalInfo.drivingLicense",
                  value: e.target.value,
                })
              );
            }}
          />
          {errors.personalInfo?.drivingLicense && (
            <p className="text-red-300 text-sm">
              {errors.personalInfo.drivingLicense}
            </p>
          )}
        </div>
        <div>
          <Input
            type="string"
            className="rounded-md p-0 pl-3 focus:outline-none font-medium max-w-md border-gray-200 bg-gray-50 h-10 mb-1"
            placeholder="Passport number (optional)"
            value={passportNo}
            onChange={(e) => {
              dispatch(
                updateFieldHandler({
                  field: "personalInfo.passportNo",
                  value: e.target.value,
                })
              );
              dispatch(
                validateFieldHandler({
                  field: "personalInfo.passportNo",
                  value: e.target.value,
                })
              );
            }}
          />
          {errors.personalInfo?.passportNo && (
            <p className="text-red-300 text-sm">
              {errors.personalInfo.passportNo}
            </p>
          )}
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

export default PersonalInfo;
