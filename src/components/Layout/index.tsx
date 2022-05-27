import Navbar from "components/Navbar";
import Spacer from "components/Spacer";
import React from "react";
import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface LayoutPropsI {
	width?: "full" | "normal";
	children: React.ReactNode;
	className?: string;
	navbar?: boolean;
	constrainContentWidth?: boolean;
}

const widthStyles = {
	full: style.full,
	normal: style.normal,
};

const Content = ({ children }: { children: React.ReactNode }) => (
	<div className={style.content}>{children}</div>
);

const ContentArea = ({ children }: { children: React.ReactNode }) => (
	<div className={style.content_area}>{children}</div>
);

const Layout = ({
	children,
	className,
	width = "normal",
	navbar = true,
	constrainContentWidth = true,
}: LayoutPropsI) => {
	const widthClass = widthStyles[width];

	return (
		<div className={combineStyles(style.container, widthClass, className)}>
			{navbar && <Navbar />}
			<ContentArea>
				<Content>{children}</Content>
			</ContentArea>
		</div>
	);
};

export default Layout;
