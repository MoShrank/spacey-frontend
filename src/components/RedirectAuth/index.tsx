import { useStore } from "hooks/useStore";
import { Navigate, useLocation } from "react-router-dom";

const RedirectAuth = ({ children }: { children: JSX.Element }) => {
	const isLoggedIn = useStore(state => state.isLoggedIn);

	const location = useLocation();
	const fromPath = (location.state as { from: string })?.from || "/";

	if (isLoggedIn && fromPath == "/") {
		return <Navigate to="/" />;
	}

	return children;
};

export default RedirectAuth;
