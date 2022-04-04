import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import Text from "components/Text";
import useLockBodyScroll from "hooks/useScrollLock";
import { Link } from "react-router-dom";
import { useGlobalState } from "store/store";

import style from "./style.module.scss";

interface BurgerMenuProps {
	onClose: () => void;
}

const menuItems = [
	{
		label: "Logout",
		Icon: LogoutIcon,
		to: "/logout",
		needsLogin: true,
	},
];

const BurgerMenu = ({ onClose }: BurgerMenuProps) => {
	useLockBodyScroll();

	const [isLoggedIn] = useGlobalState("isLoggedIn");

	let items = menuItems;
	if (!isLoggedIn) {
		items = items.filter(item => !item.needsLogin);
	}

	return (
		<div className={style.container}>
			<div className={style.overlay} onClick={onClose}>
				<div className={style.menu}>
					{items.map(({ label, Icon, to }) => (
						<Link onClick={onClose} key={label} to={to} className={style.item}>
							<Text color="darkblue">{label}</Text>
							<Icon />
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default BurgerMenu;
