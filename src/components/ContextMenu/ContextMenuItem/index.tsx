import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface ContextMenuItemI {
	children: React.ReactNode;
	onClick: () => void;
	className?: string;
}

const ContextMenuItem = ({
	children,
	onClick,
	className,
}: ContextMenuItemI) => {
	return (
		<div
			className={combineStyles(style.context_menu_item, className)}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default ContextMenuItem;
