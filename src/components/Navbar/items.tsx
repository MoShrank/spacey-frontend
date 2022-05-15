import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import React from "react";

export interface menuItemsI {
	label: string;
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	to: string;
	needsLogin: boolean;
}

export const menuItems: menuItemsI[] = [
	{
		label: "Logout",
		Icon: LogoutIcon,
		to: "/logout",
		needsLogin: true,
	},
];
