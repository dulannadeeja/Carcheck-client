import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate, useLocation } from "react-router-dom";
import { AccountStatus, AccountType } from "../../features/authentication/auth";


interface ProtectedRouteProps {
    children: React.ReactNode;
}

const SellingDashboardProtection: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const {user} = useSelector((state: RootState) => state.auth);

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    const isApproved = (user.accountType === AccountType.sellerBusiness || user.accountType === AccountType.sellerPersonal) && (user.status !== AccountStatus.sellingRestricted) 

    if (!isApproved) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default SellingDashboardProtection;