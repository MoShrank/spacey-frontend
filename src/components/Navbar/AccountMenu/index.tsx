import { menuItems } from "components/Navbar/items";
import useLockBodyScroll from "hooks/useScrollLock";

import Item from "../Item";
import style from "./style.module.scss";

interface AccountMenuProps {
	onClose: () => void;
}

const AccountMenu = ({ onClose }: AccountMenuProps) => {
	useLockBodyScroll();

	return (
		<div className={style.menu}>
			{menuItems.map(item => (
				<Item key={item.label} onClick={onClose} {...item} />
			))}
		</div>
	);
};

export default AccountMenu;
