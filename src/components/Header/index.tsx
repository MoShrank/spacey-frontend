import style from "./style.module.scss";

interface HeaderProps {
	kind: "h1" | "h2";
	color?: "primary" | "secondary";
	children: React.ReactNode;
}

const colorMapping = {
	primary: "#19344C",
	secondary: "#417DB5",
};

const Header = ({ children, kind, color }: HeaderProps) => {
	let header = null;

	color = color || "primary";

	const headerStyle = { color: colorMapping[color] };

	if (kind === "h1") {
		header = (
			<h1 className={style.h1} style={headerStyle}>
				{children}
			</h1>
		);
	} else {
		header = (
			<h2 className={style.h2} style={headerStyle}>
				{children}
			</h2>
		);
	}

	return header;
};

export default Header;
