import "./style.scss";

interface TextProps {
	children: React.ReactNode;
	color: "darkblue" | "lightgrey";
}

const Text = (props: TextProps) => {
	const color = props.color === "darkblue" ? "#417db5" : "#8c8c8c";

	return <p style={{ color: color }}>{props.children}</p>;
};

export default Text;
