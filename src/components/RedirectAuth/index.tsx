import { Navigate } from "react-router-dom";
import { useGlobalState } from "store/store";

const RedirectAuth = ({ children }: { children: JSX.Element }) => {
	const [isLoggedIn] = useGlobalState("isLoggedIn");

	if (isLoggedIn) {
		return <Navigate to="/" />;
	}

	return children;
};

export default RedirectAuth;
