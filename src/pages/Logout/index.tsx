import { logout } from "api/user";
import Loader from "components/Loader";
import { initialState, useStore } from "hooks/useStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	const navigate = useNavigate();
	const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
	const dispatch = useStore(state => state.dispatch);

	useEffect(() => {
		logout().then(() => {
			setIsLoggedIn();
			dispatch({ ...initialState, isLoggedIn: false });
			navigate("/login");
		});
	}, []);

	return <Loader size="large" />;
};

export default Logout;
