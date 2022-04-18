import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import Text from "components/Text";
import useLockBodyScroll from "hooks/useScrollLock";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

interface AccountMenuProps {
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

const AccountMenu = ({ onClose }: AccountMenuProps) => {
	useLockBodyScroll();

	return (
		<div className={style.container}>
			<div className={style.overlay} onClick={onClose}>
				<div className={style.menu}>
					{menuItems.map(({ label, Icon, to }) => (
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

export default AccountMenu;
