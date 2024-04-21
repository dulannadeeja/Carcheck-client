import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { AccountStatus } from "../../features/authentication/auth";
import { RootState } from "../../store/store";


interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProvideDocsProtection:React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const { user } = useSelector((state:RootState) => state.auth);
    if (!user?.accountType) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    const isProvider =
        user.accountType === AccountStatus.docsNeeded;
    
    if (!isProvider) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    
    return <>{children}</>;
    }

export default ProvideDocsProtection;