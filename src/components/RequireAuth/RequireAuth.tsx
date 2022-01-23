import { Navigate, useLocation } from "react-router-dom";
import { useGlobalState } from "store/store";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const [isLoggedIn] = useGlobalState("isLoggedIn");
    let location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
