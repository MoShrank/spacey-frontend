import { ReactComponent as ExitIcon } from "assets/icons/exit.svg";
import { ReactComponent as InfoIcon } from "assets/icons/info.svg";
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
	{
		label: "Imprint",
		Icon: InfoIcon,
		to: "/imprint",
		needsLogin: false,
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
			<div className={style.overlay} onClick={onClose} />
			<div className={style.menu}>
				<ExitIcon onClick={onClose} />
				{items.map(({ label, Icon, to }) => (
					<Link onClick={onClose} key={label} to={to} className={style.item}>
						<Text color="darkblue">{label}</Text>
						<Icon />
					</Link>
				))}
			</div>
		</div>
	);
};

export default BurgerMenu;
