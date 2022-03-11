import { ComponentProps } from "react";

import "./style.scss";

interface TextProps extends ComponentProps<"p"> {
	children: React.ReactNode;
	color?: "darkblue" | "lightgrey" | "grey" | "black" | "white" | "red";
}

const colors = {
	darkblue: "#19344c",
	blue: "#417db5",
	lightgrey: "#8c8c8c",
	grey: "#636363",
	black: "#000000",
	white: "#ffffff",
	red: "#c81c23",
};

const Text = ({ children, color, style, ...rest }: TextProps) => {
	const colorStyle = color ? colors[color] : colors.darkblue;

	return (
		<p style={{ color: colorStyle, ...style }} {...rest}>
			{children}
		</p>
	);
};

export default Text;
