import { useGlobalState } from "store/store";
import { Navigate } from "react-router-dom";

const RedirectAuth = ({ children }: { children: JSX.Element }) => {
    const [isLoggedIn, _] = useGlobalState("isLoggedIn");

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children;
};

export default RedirectAuth;