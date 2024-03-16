import style from "./style.module.scss";

interface HeaderProps {
	kind: "h1" | "h2" | "h3";
	color?: "primary" | "secondary" | "black";
	children: React.ReactNode;
	className?: string;
	align?: "left" | "center" | "right";
}

const colorMapping = {
	primary: "#224462",
	secondary: "#417DB5",
	black: "#000",
};

const Header = ({
	children,
	kind,
	color,
	className,
	align = "left",
}: HeaderProps) => {
	let header = null;

	color = color || "primary";

	const headerStyle = { color: colorMapping[color], textAlign: align };

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
