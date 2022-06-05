import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface CardInputProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
	color: string;
	disableTopBoarder?: boolean;
}

const CardContainer = ({
	children,
	color,
	style: propStyle,
	disableTopBoarder = true,
	...rest
}: CardInputProps) => {
	return (
		<div
			style={{ backgroundColor: color, ...propStyle }}
			className={combineStyles(
				style.card_input_container,
				disableTopBoarder ? undefined : style.border_radius_top,
			)}
			{...rest}
		>
			{children}
			<span className={style.line} />
		</div>
	);
};

export default CardContainer;
