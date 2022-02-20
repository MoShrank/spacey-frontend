import "./style.scss";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	color?: "darkblue" | "lightgrey" | "grey" | "black" | "white";
	className?: string;
	style?: React.CSSProperties;
}

const colors = {
	darkblue: "#417db5",
	lightgrey: "#8c8c8c",
	grey: "#636363",
	black: "#000000",
	white: "#ffffff",
};

const Text = (props: TextProps) => {
	const color = props.color ? colors[props.color] : colors.darkblue;

	return (
		<p className={props.className} style={{ color: color, ...props.style }}>
			{props.children}
		</p>
	);
};

export default Text;
