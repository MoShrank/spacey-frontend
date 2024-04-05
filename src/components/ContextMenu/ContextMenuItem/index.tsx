import style from "./style.module.scss";

interface ContextMenuItemI {
	children: React.ReactNode;
	onClick: () => void;
}

const ContextMenuItem = ({ children, onClick }: ContextMenuItemI) => {
	return (
		<div className={style.context_menu_item} onClick={onClick}>
			{children}
		</div>
	);
};

export default ContextMenuItem;
