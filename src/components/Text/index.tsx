import "./style.scss";

interface TextProps {
	children: React.ReactNode;
	color: "darkblue" | "lightgrey" | "grey" | "black" | "white";
	className?: string;
}

const colors = {
	darkblue: "#417db5",
	lightgrey: "#8c8c8c",
	grey: "#636363",
	black: "#000000",
	white: "#ffffff",
};

const Text = (props: TextProps) => {
	const color = colors[props.color];

	return (
		<p className={props.className} style={{ color: color }}>
			{props.children}
		</p>
	);
};

export default Text;
