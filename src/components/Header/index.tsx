import "./style.scss";

interface HeaderProps {
	kind: "h1" | "h2";
	children: React.ReactNode;
}

const Header = (props: HeaderProps) => {
	let header = null;

	if (props.kind === "h1") {
		header = <h1>{props.children}</h1>;
	} else {
		header = <h2>{props.children}</h2>;
	}

	return header;
};

export default Header;
