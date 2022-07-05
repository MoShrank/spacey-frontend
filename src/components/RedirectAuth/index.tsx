import { useStore } from "hooks/useStore";
import { Navigate } from "react-router-dom";

const RedirectAuth = ({ children }: { children: JSX.Element }) => {
	const isLoggedIn = useStore(state => state.isLoggedIn);

	if (isLoggedIn) {
		return <Navigate to="/" />;
	}

	return children;
};

export default RedirectAuth;
