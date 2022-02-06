import { ReactComponent as ExitIcon } from "assets/icons/exit.svg";
import { ReactComponent as InfoIcon } from "assets/icons/info.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import Text from "components/Text";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

interface BurgerMenuProps {
	onClose: () => void;
}

const menuItems = [
	{
		label: "Logout",
		Icon: LogoutIcon,
		to: "/logout",
	},
	{
		label: "imprint",
		Icon: InfoIcon,
		to: "/imprint",
	},
];

const BurgerMenu = ({ onClose }: BurgerMenuProps) => {
	return (
		<div className={style.container}>
			<ExitIcon onClick={onClose} />
			{menuItems.map(({ label, Icon, to }) => (
				<Link onClick={onClose} key={label} to={to} className={style.item}>
					<Text color="darkblue">{label}</Text>
					<Icon />
				</Link>
			))}
		</div>
	);
};

export default BurgerMenu;