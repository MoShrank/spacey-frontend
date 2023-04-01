import Navbar from "components/Navbar";
import React from "react";
import { combineStyles } from "util/css";

import style from "./style.module.scss";

export type widthOptions = "extendedFull" | "full" | "normal";

interface LayoutPropsI {
	width?: widthOptions;
	children: React.ReactNode;
	className?: string;
	navbar?: boolean;
}

const widthOptionClassMap = {
	extendedFull: style.extended_full,
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

const ContentArea = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div className={combineStyles(style.content_area, className)}>{children}</div>
);

const Layout = ({
	children,
	className,
	width = "normal",
	navbar = true,
}: LayoutPropsI) => {
	const widthClass = widthOptionClassMap[width];

	let Con = children;

	if (width === "normal") {
		Con = <Content className={style.normal}>{Con}</Content>;
	}

	return (
		<div className={combineStyles(style.container, className)}>
			{navbar && <Navbar />}
			<ContentArea className={widthClass}>{Con}</ContentArea>
		</div>
	);
};

export default Layout;
