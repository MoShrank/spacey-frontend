import { ReactComponent as MenuIcon } from "assets/icons/menu.svg";
import { ReactComponent as HomeIcon } from "assets/img/logo_simple.svg";
import BurgerMenu from "components/BurgerMenu";
import useOnClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);
	useOnClickOutside(menuRef, () => setMenuOpen(false));

	return (
		<nav className={style.container}>
			<Link className={style.home_icon} to="/">
				<HomeIcon />
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
