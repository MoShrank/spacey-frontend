import { ReactComponent as MenuIcon } from "assets/icons/accountIcon.svg";
import { ReactComponent as HomeIcon } from "assets/img/logo_simple.svg";
import Modal from "components/Modal";
import AccountMenu from "components/Navbar/AccountMenu";
import Popup from "components/Popup";
import useOnClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

const MobileNavbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);
	useOnClickOutside(menuRef, () => setMenuOpen(false));

	return (
		<>
			<Link className={style.home_icon} to="/">
				<HomeIcon />
			</Link>
			<MenuIcon onClick={() => setMenuOpen(true)} />
			{menuOpen && (
				<Modal>
					<Popup className={style.menu_position} ref={menuRef}>
						<AccountMenu onClose={() => setMenuOpen(false)} />
					</Popup>
				</Modal>
			)}
		</>
	);
};

export default MobileNavbar;
