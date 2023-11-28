import { ComponentProps } from "react";
import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface TextProps extends ComponentProps<"p"> {
	children: React.ReactNode;
	align?: "left" | "center" | "right";
	color?: "darkblue" | "lightgrey" | "grey" | "black" | "white" | "red";
}

const colors = {
	darkblue: "#224462",
	blue: "#417db5",
	lightgrey: "#8c8c8c",
	grey: "#636363",
	black: "#000000",
	white: "#ffffff",
	red: "#c81c23",
};

const Text = ({
	children,
	color,
	align,
	style: textStyle,
	className,
	...rest
}: TextProps) => {
	const colorStyle = color ? colors[color] : colors.darkblue;
	const alignStyle = align ? align : "left";

	return (
		<p
			style={{ color: colorStyle, textAlign: alignStyle, ...textStyle }}
			className={combineStyles(style.text, className)}
			{...rest}
		>
			{children}
		</p>
	);
};

export default Text;
