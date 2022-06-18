import { getUserDataAction } from "actions/user";
import { verifyEmail } from "api/user";
import Loader from "components/Loader";
import Notificator from "events/notification";
import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { store, useGlobalState } from "store/store";
import { UserI } from "types/user";

const VerifyingEmail = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const [user] = useGlobalState<UserI>("user");

	const navigate = useNavigate();

	if (user.emailValidated) return <Navigate to="/" />;

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
					store.emit("user", getUserDataAction);
					navigate("/");
				})
				.catch(() => {
					tokenInvalid();
				});
		}
	}, []);

	return <Loader size="large" />;
};

export default VerifyingEmail;
