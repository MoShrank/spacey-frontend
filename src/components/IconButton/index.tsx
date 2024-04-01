import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface IconButtonI extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon: JSX.Element;
}

const IconButton = ({
	icon,
	className,
	disabled,
	...props
}: IconButtonI): JSX.Element => {
	return (
		<button
			className={combineStyles(
				style.icon_button_container,
				className,
				disabled ? style.disabled : "",
			)}
			disabled={disabled}
			{...props}
		>
			{icon}
		</button>
	);
};

export default IconButton;
