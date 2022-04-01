import Navbar from "components/Navbar";

import style from "./style.module.scss";

interface LayoutPropsI {
	width: "full" | "s";
	children: React.ReactNode;
}

const Layout = ({ width, children }: LayoutPropsI) => {
	const widthClass = width === "full" ? style.full : style.s;

	return (
		<div className={`${style.container} ${widthClass}`}>
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
