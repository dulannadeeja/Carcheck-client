import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/Button";
import { sellingAccountSchema } from "../schema/sellingAccountSchema";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  resetErrors,
  resetToIntialState,
  setErrors,
  updateFieldHandler,
} from "../../sellingAccountSlice";
import { ZodIssue } from "zod";
import { useSubmitRegistrationMutation } from "../../sellingAccountApiSlice";
import { toast } from "react-toastify";
import { logout } from "../../authSlice";
import { useSignoutMutation } from "../../authApiSlice";

function SubmitRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signout] = useSignoutMutation();
  const [SubmitRegistration] = useSubmitRegistrationMutation();
  const { data, errors } = useSelector(
    (state: RootState) => state.sellingAccount
  );

  const onSubmitHandler = async () => {
    // validation logic
    const errors = validateSellingAccount();
    if (Object.keys(errors).length > 0) {
      console.log("errors", errors);
      dispatch(setErrors(errors));
      toast.error("Looks like missing some information, go back and check");
      return;
    }
    // submit registration
    try {
      await SubmitRegistration(data).unwrap();
      // clear the selling account state
      dispatch(resetToIntialState());
      toast.success("Request submitted successfully, signing out...");
      // signing out the user
      await signout().unwrap();
      // logout the user
      dispatch(logout())
      // navigate to the login page
      navigate("/signin");
    } catch (error) {
      console.log("error", error);
    }
  };

  const onBack = () => {
    dispatch(
      updateFieldHandler({ field: "financialInfoVerified", value: false })
    );
    // navigate to the previous step
    navigate("/selling/register/financial-info");
  };

  const validateSellingAccount = () => {
    const result = sellingAccountSchema.safeParse(data) as { 
      success: boolean; 
      error: { issues: ZodIssue[] },
      data: typeof data
   };
    if (!result.success) {
      return handleValidationErrors(result.error.issues);
    }
    return {};
  };

  const handleValidationErrors = (issues: ZodIssue[]) => {
    // clear previous errors
    dispatch(resetErrors());
    const errorsTemp = { ...errors };
    issues.forEach((issue) => {
      if (issue.path.length > 1) {
        const parentKey = issue.path[0] as keyof typeof errors;
        const parent = errorsTemp[parentKey];
        const updatedParent = {
          ...(parent as unknown as object),
          [issue.path[1]]: issue.message,
        };
        errorsTemp[parentKey] = updatedParent as never;
      } else {
        const key = issue.path[0] as keyof typeof errors;
        errorsTemp[key] = issue.message as never;
      }
    });
    return errorsTemp;
  };
  return (
    <div className="max-w-lg text-base">
      <h1 className="text-xl font-medium mb-3">Submit request</h1>
      <p className="mb-5">
        This will send your request to be verified by carCheck. we will contact
        you once you are activated on selling account.
      </p>
      <p className="mb-5 bg-gray-100 p-2 px-3 rounded-md text-gray-400">
        You may be asked to provide additional information to verify your
        identity.
      </p>
      <p className="">
        By Submitting your registration information, you agree to offer products
        and services that comply with applicable laws and agree to the{" "}
        <Link to="/terms" className="text-blue-300">
          Terms of Use.
        </Link>
      </p>
      <div className="flex gap-3 mt-5">
        <Button intent={"secondary"} className="rounded-full" onClick={onBack}>
          Back
        </Button>
        <Button
          intent={"primary"}
          className="rounded-full"
          onClick={onSubmitHandler}
        >
          Submit request
        </Button>
      </div>
    </div>
  );
}

export default SubmitRegistration;
