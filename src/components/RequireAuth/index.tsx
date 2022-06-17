import { Navigate, useLocation } from "react-router-dom";
import { useGlobalState } from "store/store";
import { UserI } from "types/user";

const RequireAuth = ({
	children,
	needsEmailVerification = true,
}: {
	children: JSX.Element;
	needsEmailVerification?: boolean;
}) => {
	const [isLoggedIn] = useGlobalState("isLoggedIn");
	const location = useLocation();
	const [user] = useGlobalState<UserI>("user");

	if (!isLoggedIn) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (needsEmailVerification) {
		if (!user.emailValidated) {
			return <Navigate to="/verify-email" state={{ from: location }} />;
		}
	}

	return children;
};

export default RequireAuth;
