import { ReactComponent as MenuIcon } from "assets/icons/menu.svg";
import HomeIcon from "assets/icons/simple_logo.svg";
import BurgerMenu from "components/BurgerMenu";
import useOnClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "store/store";

import "./style.scss";

const Navbar = () => {
	const [hand] = useGlobalState("hand");
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);
	useOnClickOutside(menuRef, () => setMenuOpen(false));

	return (
		<nav className={`navbar_container ${hand === "left" && "left"}`}>
			<Link to="/">
				<img src={HomeIcon} alt="home icon" />
			</Link>
			{menuOpen ? (
				<BurgerMenu onClose={() => setMenuOpen(false)} />
			) : (
				<MenuIcon onClick={() => setMenuOpen(true)} />
			)}
		</nav>
	);
};

export default Navbar;
