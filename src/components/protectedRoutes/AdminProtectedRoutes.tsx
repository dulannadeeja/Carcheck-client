import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../store/store";
import { AccountType } from "../../features/authentication/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
    }

const AdminProtectedRoutes:React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const { user } = useSelector((state:RootState) => state.auth);
    if (!user?.accountType) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    const isAdmin =
        user.accountType === AccountType.admin;
    
    if (!isAdmin) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    
    return <>{children}</>;
    }

export default AdminProtectedRoutes;