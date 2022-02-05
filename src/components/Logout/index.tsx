import { ReactComponent as Icon } from "assets/icons/logout.svg";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const Logout = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("logout");
	};

	return (
		<div onClick={handleClick} className="logout_container">
			<div className="logout_text">Logout</div>
			<Icon />
		</div>
	);
};

export default Logout;
