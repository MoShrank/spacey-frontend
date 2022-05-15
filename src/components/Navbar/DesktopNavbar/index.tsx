import { ReactComponent as DesktopLogo } from "assets/img/desktop_logo.svg";

import Item from "../Item";
import { menuItems } from "../items";

const DesktopNavbar = () => {
	return (
		<>
			<DesktopLogo />
			{menuItems.map(item => (
				<Item key={item.label} {...item} />
			))}
		</>
	);
};

export default DesktopNavbar;
