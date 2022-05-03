import style from "./style.module.scss";

interface HeaderProps {
	kind: "h1" | "h2" | "h3";
	color?: "primary" | "secondary" | "black";
	children: React.ReactNode;
	className?: string;
}

const colorMapping = {
	primary: "#224462",
	secondary: "#417DB5",
	black: "#000",
};

const Header = ({ children, kind, color, className }: HeaderProps) => {
	let header = null;

	color = color || "primary";

	const headerStyle = { color: colorMapping[color] };

	if (kind === "h1") {
		header = (
			<h1 className={`${style.h1} ${className || ""}`} style={headerStyle}>
				{children}
			</h1>
		);
	} else if (kind === "h2") {
		header = (
			<h2 className={`${style.h2} ${className || ""}`} style={headerStyle}>
				{children}
			</h2>
		);
	} else {
		header = (
			<h3 className={`${style.h3} ${className || ""}`} style={headerStyle}>
				{children}
			</h3>
		);
	}

	return header;
};

export default Header;
