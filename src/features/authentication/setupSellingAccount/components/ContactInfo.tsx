import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import PhoneVerification from "./PhoneVerification";
import EmailVerification from "./EmailVerification";
import AccountType from "./AccountType";

function ContactInfo() {
  const { data } = useSelector((state: RootState) => state.sellingAccount);
  const { phoneVerified, emailVerified } = data;

  return (
    <div className="text-base">
      {!phoneVerified && <PhoneVerification />}
      {phoneVerified && !emailVerified && <EmailVerification />}
      {phoneVerified && emailVerified && <AccountType />}
    </div>
  );
}

export default ContactInfo;
