import Navbar from "components/Navbar";
import React from "react";
import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface LayoutPropsI {
	width?: "full" | "normal";
	children: React.ReactNode;
	className?: string;
	navbar?: boolean;
}

const widthStyles = {
	full: style.full,
	normal: style.normal,
};

const Content = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => <div className={combineStyles(style.content, className)}>{children}</div>;

const ContentArea = ({ children }: { children: React.ReactNode }) => (
	<div className={style.content_area}>{children}</div>
);

const Layout = ({
	children,
	className,
	width = "normal",
	navbar = true,
}: LayoutPropsI) => {
	const widthClass = widthStyles[width];

	let Con = children;

	if (width === "normal") {
		Con = <Content className={widthClass}>{Con}</Content>;
	}

	<Content>{children}</Content>;

	return (
		<div className={combineStyles(style.container, className)}>
			{navbar && <Navbar />}
			<ContentArea>{Con}</ContentArea>
		</div>
	);
};

export default Layout;
