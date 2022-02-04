import { logout } from "api/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "store/store";
import { store } from "store/store";

const Logout = () => {
	const navigate = useNavigate();
	const [, setIsLoggedIn] = useGlobalState("isLoggedIn");

	useEffect(() => {
		logout().then(() => {
			setIsLoggedIn(false);
			store.clearState();
			navigate("/login");
		});
	}, []);

	return null;
};

export default Logout;
