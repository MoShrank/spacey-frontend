import useStore from "hooks/useStore";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({
	children,
	needsEmailVerification = true,
}: {
	children: JSX.Element;
	needsEmailVerification?: boolean;
}) => {
	const isLoggedIn = useStore(state => state.isLoggedIn);
	const user = useStore(state => state.user);

	const location = useLocation();
	const pathName = location.pathname;

	if (!isLoggedIn) {
		return <Navigate to="/login" state={{ from: pathName }} replace />;
	}

	if (needsEmailVerification) {
		if (!user?.emailValidated) {
			return <Navigate to="/verify-email" state={{ from: pathName }} />;
		}
	}

	return children;
};

export default RequireAuth;
