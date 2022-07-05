import { verifyEmail } from "api/user";
import Loader from "components/Loader";
import Notificator from "events/notification";
import useStore from "hooks/useStore";
import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const VerifyingEmail = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const [user, setUser] = useStore(state => [state.user, state.setUser]);

	const navigate = useNavigate();

	useEffect(() => {
		const tokenInvalid = () => {
			Notificator.push({
				type: "ERROR",
				payload: {
					message: "Could not verify email",
					hint: "Token is invalid or expired",
				},
			});
			navigate("/verify-email");
		};

		if (!token) tokenInvalid();
		else {
			verifyEmail(token)
				.then(() => {
					setUser({ ...user, emailValidated: true });
					navigate("/");
				})
				.catch(() => {
					tokenInvalid();
				});
		}
	}, []);

	if (user.emailValidated) return <Navigate to="/" />;

	return <Loader size="large" />;
};

export default VerifyingEmail;
