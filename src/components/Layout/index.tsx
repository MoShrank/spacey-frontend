import Navbar from "components/Navbar";

import style from "./style.module.scss";

interface LayoutPropsI {
	width: "full" | "desktop" | "s";
	children: React.ReactNode;
	className?: string;
}

const widthStyles = {
	full: style.full,
	desktop: style.desktop,
	s: style.s,
};

const Layout = ({ width, children, className }: LayoutPropsI) => {
	const widthClass = widthStyles[width];

	return (
		<div className={`${style.container} ${widthClass} ${className}`}>
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
