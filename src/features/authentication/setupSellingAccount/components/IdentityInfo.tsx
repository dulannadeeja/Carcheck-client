import Address from "./Address";
import PersonalInfo from "./PersonalInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import BusinessInfo from "./BusinessInfo";
import { AccountType } from "../../auth";

function IdentityInfo() {
  
  const { data} = useSelector(
    (state: RootState) => state.sellingAccount
  );

  return (
    <div className="flex flex-col gap-10 pb-20">
      {!data.personalInfoVerified && (
        <>
          <PersonalInfo />
        </>
      )}
      {!data.businessAddressVerified && data.personalInfoVerified && (
        <Address />
      )}
      {data.personalInfoVerified &&
        data.businessAddressVerified &&
        !data.businessInfoVerified &&
        data.accountType !== AccountType.sellerPersonal && <BusinessInfo />}
    </div>
  );
}

export default IdentityInfo;
