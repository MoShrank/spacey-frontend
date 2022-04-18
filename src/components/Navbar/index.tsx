import { ReactComponent as MenuIcon } from "assets/icons/accountIcon.svg";
import { ReactComponent as HomeIcon } from "assets/img/logo_simple.svg";
import AccountMenu from "components/AccountMenu";
import useOnClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "store/store";

import style from "./style.module.scss";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);
	const [isLoggedIn] = useGlobalState("isLoggedIn");
	useOnClickOutside(menuRef, () => setMenuOpen(false));

	return (
		<nav className={style.container}>
			{isLoggedIn && (
				<Link className={style.home_icon} to="/">
					<HomeIcon />
				</Link>
			)}
			{isLoggedIn && <MenuIcon onClick={() => setMenuOpen(true)} />}
			{menuOpen && <AccountMenu onClose={() => setMenuOpen(false)} />}
		</nav>
	);
};

export default Navbar;
