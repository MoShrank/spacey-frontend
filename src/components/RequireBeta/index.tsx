import { Navigate } from "react-router-dom";
import { useGlobalState } from "store/store";
import { UserI } from "types/user";

const RequireBeta = ({ children }: { children: JSX.Element }) => {
	const [user] = useGlobalState<UserI>("user");

	if (!user.betaUser) {
		return <Navigate to="/" />;
	}

	return children;
};

export default RequireBeta;
