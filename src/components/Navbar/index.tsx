import HomeIcon from "assets/icons/simple_logo.svg";
import Logout from "components/Logout";
import { Link } from "react-router-dom";

import "./style.scss";

const Navbar = () => {
	return (
		<header className="navbar_container">
			<Link to="/">
				<img src={HomeIcon} alt="home icon" />
			</Link>
			<Logout />
		</header>
	);
};

export default Navbar;
