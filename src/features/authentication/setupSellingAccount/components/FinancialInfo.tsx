import Input from "../../../../components/ui/Input";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrors,
  updateFieldHandler,
  validateFieldHandler,
} from "../../sellingAccountSlice";
import Button from "../../../../components/ui/Button";
import { financialInfoSchema } from "../schema/sellingAccountSchema";
import { ZodIssue } from "zod";
import { useNavigate } from "react-router-dom";
import { AccountType } from "../../auth";

function FinancialInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, errors } = useSelector(
    (state: RootState) => state.sellingAccount
  );

  const onChangeHandler = (field: string, value: string) => {
    dispatch(updateFieldHandler({ field, value }));
    dispatch(validateFieldHandler({ field, value }));
  };

  const onContinue = () => {
    const financialInfoErrors = validateFinancialInfo();
    console.log("financialInfoErrors", financialInfoErrors);
    if (financialInfoErrors) {
      dispatch(updateFieldHandler(
        { field: "financialInfoVerified", value: false }
      ))
      dispatch(
        setErrors({
          financialInfo: financialInfoErrors,
        })
      );
      return;
    }
    dispatch(
      updateFieldHandler({ field: "financialInfoVerified", value: true })
    );
    // navigate to the next step
    navigate("/selling/register/submit-registration");
  };

  const onBack = () => {
    dispatch(
      updateFieldHandler({ field: "financialInfoVerified", value: false })
    );
    dispatch(
      updateFieldHandler({ field: "businessInfoVerified", value: false })
    );
    // navigate to the previous step
    if (data.accountType === AccountType.sellerPersonal) {
      dispatch(
        updateFieldHandler({ field: "businessAddressVerified", value: false })
      );
    }
    navigate("/selling/register/identity-info");
  };

  const handleFinancialInfoValidationErrors = (issues: ZodIssue[]) => {
    const financialInfoErrors: typeof errors.financialInfo = {
      bankName: "",
      accountNumber: "",
      accountName: "",
      branchCode: "",
    };
    issues.forEach((issue) => {
      if (issue.path.length > 1) {
        const parentKey = issue.path[0] as keyof typeof errors.financialInfo;
        const parent = financialInfoErrors[parentKey];
        const updatedParent = {
          ...(parent as unknown as object),
          [issue.path[1]]: issue.message,
        };

        financialInfoErrors[parentKey] = updatedParent as never;
      } else {
        const key = issue.path[0] as keyof typeof errors.financialInfo;
        financialInfoErrors[key] = issue.message as never;
      }
    });
    return financialInfoErrors;
  };

  const validateFinancialInfo = () => {
    const result = financialInfoSchema.safeParse(data.financialInfo) as { 
      success: boolean; 
      error: { issues: ZodIssue[] },
      data: typeof data.financialInfo
   };
    if (!result.success) {
      return handleFinancialInfoValidationErrors(result.error.issues);
    }
    return false;
  };

  return (
    <div className="">
      <h1 className="text-xl font-medium mb-3">Provide your bank details</h1>
      <p className="mb-5">
        You will need to provide your bank details to receive payments from
        carCheck. make sure to provide accurate information to avoid any issues
        with your account.
      </p>
      <p className="mb-3">Your bank account info </p>
      <div className="flex flex-col gap-3">
        {/* bank name */}
        <div>
          <Input
            type="string"
            className="border-gray-200 h-10 bg-gray-50 mb-1 max-w-md rounded-md p-0 pl-3 focus:outline-none font-medium"
            placeholder="name of your bank"
            value={data.financialInfo.bankName}
            onChange={(e) =>
              onChangeHandler("financialInfo.bankName", e.target.value)
            }
          />
          {errors.financialInfo?.bankName && (
            <p className="text-red-300 text-sm">
              {errors["financialInfo"]["bankName"]}
            </p>
          )}
        </div>
        {/* account number */}
        <div>
          <Input
            type="string"
            className="border-gray-200 h-10 bg-gray-50 mb-1 max-w-md rounded-md p-0 pl-3 focus:outline-none font-medium"
            placeholder="account number"
            value={data.financialInfo.accountNumber}
            onChange={(e) =>
              onChangeHandler("financialInfo.accountNumber", e.target.value)
            }
          />
          {errors.financialInfo?.accountNumber && (
            <p className="text-red-300 text-sm">
              {errors["financialInfo"]["accountNumber"]}
            </p>
          )}
        </div>
        {/* account name */}
        <div>
          <Input
            type="string"
            className="border-gray-200 h-10 bg-gray-50 mb-1 max-w-md rounded-md p-0 pl-3 focus:outline-none font-medium"
            placeholder="account name"
            value={data.financialInfo.accountName}
            onChange={(e) =>
              onChangeHandler("financialInfo.accountName", e.target.value)
            }
          />
          {errors.financialInfo?.accountName && (
            <p className="text-red-300 text-sm">
              {errors["financialInfo"]["accountName"]}
            </p>
          )}
        </div>
        {/* branch code */}
        <div>
          <Input
            type="string"
            className="border-gray-200 h-10 bg-gray-50 mb-1 max-w-md rounded-md p-0 pl-3 focus:outline-none font-medium"
            placeholder="branch code"
            value={data.financialInfo.branchCode}
            onChange={(e) =>
              onChangeHandler("financialInfo.branchCode", e.target.value)
            }
          />
          {errors.financialInfo?.branchCode && (
            <p className="text-red-300 text-sm">
              {errors["financialInfo"]["branchCode"]}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          intent="secondary"
          className="rounded-full mt-5"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          intent="primary"
          className="rounded-full mt-5"
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default FinancialInfo;
