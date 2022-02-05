import "./style.scss";

interface TextProps {
	children: React.ReactNode;
	color: "darkblue" | "lightgrey";
	className?: string;
}

const Text = (props: TextProps) => {
	const color = props.color === "darkblue" ? "#417db5" : "#8c8c8c";

	return (
		<p className={props.className} style={{ color: color }}>
			{props.children}
		</p>
	);
};

export default Text;
