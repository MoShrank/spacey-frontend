import { logout } from "api/user";
import { Navigate } from "react-router-dom";
import { store, useGlobalState } from "store/store";

const Logout = () => {
    const [, setIsLoggedIn] = useGlobalState("isLoggedIn");

    logout();
    store.clearState();
    setIsLoggedIn(false);

    return <Navigate to="/login" />;
};

export default Logout;
