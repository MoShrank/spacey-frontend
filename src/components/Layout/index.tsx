import Navbar from "components/Navbar";
import Spacer from "components/Spacer";
import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface LayoutPropsI {
	width: "full" | "desktop" | "s";
	children: React.ReactNode;
	className?: string;
	navbar?: boolean;
}

const widthStyles = {
	full: style.full,
	desktop: style.desktop,
	s: style.s,
};

const Layout = ({
	width,
	children,
	className,
	navbar = true,
}: LayoutPropsI) => {
	const widthClass = widthStyles[width];
	return (
		<div className={combineStyles(style.container, widthClass, className)}>
			{navbar && <Navbar />}
			{children}
			<Spacer spacing={1} />
		</div>
	);
};

export default Layout;
