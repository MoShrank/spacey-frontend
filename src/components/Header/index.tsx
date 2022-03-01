import "./style.scss";

interface HeaderProps {
	kind: "h1" | "h2";
	color?: "primary" | "secondary";
	children: React.ReactNode;
}

const colorMapping = {
	primary: "#417DB5",
	secondary: "#19344C",
};

const Header = ({ children, kind, color }: HeaderProps) => {
	let header = null;

	color = color || "primary";

	const style = { color: colorMapping[color] };

	if (kind === "h1") {
		header = <h1 style={style}>{children}</h1>;
	} else {
		header = <h2 style={style}>{children}</h2>;
	}

	return header;
};

export default Header;
