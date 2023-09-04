import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequireAuth({ allowedRoles }) {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        //If the user role is same, then show the respective component otherwise check if the user is authenticated 
        //but doesn't have role permission then navigate to unauthorized page or if the user is not authenticated naviagte to login page
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth
