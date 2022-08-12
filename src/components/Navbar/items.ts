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
		label: "Settings",
		Icon: LogoutIcon,
		to: "/settings",
		needsLogin: true,
	},
	{
		label: "Log out",
		Icon: LogoutIcon,
		to: "/logout",
		needsLogin: true,
	},
];
