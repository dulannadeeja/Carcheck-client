import Address from "./Address";
import PersonalInfo from "./PersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import BusinessInfo from "./BusinessInfo";
import { AccountType } from "../../auth";

function IdentityInfo() {
  const dispatch = useDispatch();
  const { data, errors } = useSelector(
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
