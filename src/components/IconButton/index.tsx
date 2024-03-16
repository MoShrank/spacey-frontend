import style from "./style.module.scss";

interface IconButtonI {
	icon: JSX.Element;
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const IconButton = ({ icon, onClick }: IconButtonI): JSX.Element => {
	return (
		<button onClick={onClick} className={style.icon_button_container}>
			{icon}
		</button>
	);
};

export default IconButton;
