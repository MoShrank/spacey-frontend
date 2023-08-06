import { ReactComponent as DesktopLogo } from "assets/img/desktop_logo.svg";
import Search from "components/Search";
import { Link } from "react-router-dom";

import Item from "../Item";
import { menuItems } from "../items";
import style from "./style.module.scss";

const DesktopNavbar = () => {
	return (
		<>
			<Link to="/" className={style.svg}>
				<DesktopLogo />
			</Link>
			<Search />
			<div className={style.items}>
				{menuItems.map(item => (
					<Item key={item.label} {...item} />
				))}
			</div>
		</>
	);
};

export default DesktopNavbar;
