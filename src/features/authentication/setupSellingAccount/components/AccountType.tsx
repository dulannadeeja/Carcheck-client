import RadioButton from "../../../../components/ui/RadioButton";
import Button from "../../../../components/ui/Button";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { AccountType as AccountTypes } from "../../auth";
import {
  resetEmailVerification,
  updateFieldHandler,
} from "../../sellingAccountSlice";
import { useNavigate } from "react-router-dom";

function AccountType() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.sellingAccount);
  const { accountType } = data;

  const onTypeChange = (type: AccountTypes) => {
    dispatch(updateFieldHandler({ field: "accountType", value: type }));
  };

  const onGoBack = () => {
    // set the email verification state to initial
    dispatch(resetEmailVerification());
  };

  const onContinue = () => {
    // continue to the next step
    navigate("/selling/register/identity-info");
  };

  return (
    <div>
      <h1 className="text-xl font-medium mb-3">
        Do you want to continue with an{" "}
        <span className="font-medium">individual</span> account?
      </h1>
      <p className="mb-5">
        You're currently selling on carCheck as an{" "}
        <span className="font-medium">individual</span>. But if you registered
        as a vehicle trading company in sri lanka, you can continue to use an{" "}
        <span className="font-medium">carCheck company account</span>, or in
        case you're a service provider, you can continue to use an{" "}
        <span className="font-medium">carCheck service provider account</span>.
      </p>
      <div className="mb-5">
        <div className="flex gap-2 items-center mb-3">
          <RadioButton
            id="individual"
            name="businessType"
            checked={accountType === AccountTypes.sellerPersonal}
            onChange={(e) => {
              if (e.target.checked) {
                onTypeChange(AccountTypes.sellerPersonal);
              }
            }}
          />
          <label htmlFor="individual">
            Yes, keep this as an <span className="font-medium">individual</span>{" "}
            account
          </label>
        </div>
        <div className="flex gap-2 items-center mb-3">
          <RadioButton
            id="business"
            name="businessType"
            checked={accountType === AccountTypes.sellerBusiness}
            onChange={(e) => {
              if (e.target.checked) {
                onTypeChange(AccountTypes.sellerBusiness);
              }
            }}
          />
          <label htmlFor="business">
            Change to a <span className="font-medium">company</span> account
          </label>
        </div>
        <div className="flex gap-2 items-center mb-3">
          <RadioButton
            id="business"
            name="businessType"
            checked={accountType === AccountTypes.serviceProvider}
            onChange={(e) => {
              if (e.target.checked) {
                onTypeChange(AccountTypes.serviceProvider);
              }
            }}
          />
          <label htmlFor="business">
            Change to a <span className="font-medium">service provider</span>{" "}
            account
          </label>
        </div>
      </div>
      <div className="flex gap-5">
        <Button intent="secondary" className="rounded-full" onClick={onGoBack}>
          Back
        </Button>
        <Button intent="primary" className="rounded-full" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default AccountType;
