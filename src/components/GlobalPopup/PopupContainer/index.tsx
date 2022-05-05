import style from "./style.module.scss";

interface PopupContainerI {
	children: React.ReactNode;
	position: "top" | "bottom";
}

const PopupContainer = ({ children, position }: PopupContainerI) => {
	const containerStyle = position == "top" ? { top: 0 } : { bottom: 0 };

	return (
		<div style={containerStyle} className={style.popup_container}>
			{children}
		</div>
	);
};

export default PopupContainer;
