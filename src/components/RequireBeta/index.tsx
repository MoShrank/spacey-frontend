import useStore from "hooks/useStore";
import { Navigate } from "react-router-dom";

const RequireBeta = ({ children }: { children: JSX.Element }) => {
	const user = useStore(state => state.user);

	if (!user?.betaUser) {
		return <Navigate to="/" />;
	}

	return children;
};

export default RequireBeta;
