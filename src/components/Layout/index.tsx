import Navbar from "components/Navbar";
import Search from "components/Search";
import React from "react";
import { combineStyles } from "util/css";

import style from "./style.module.scss";

export type widthOptions = "extendedFull" | "full" | "normal" | "reader";

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
	reader: style.reader,
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
	<div
		id="content_area"
		className={combineStyles(style.content_area, className)}
	>
		{children}
	</div>
);

const Layout = ({
	children,
	className,
	width = "normal",
	navbar = true,
}: LayoutPropsI) => {
	const widthClass = widthOptionClassMap[width];
	const headerGapClass = navbar ? style.with_navbar : style.without_navbar;

	let Con = children;

	if (width === "normal" || width === "reader") {
		Con = (
			<Content className={width === "normal" ? style.normal : style.reader}>
				{Con}
			</Content>
		);
	}

	return (
		<div className={combineStyles(style.container, className)}>
			{navbar && <Navbar />}
			<ContentArea className={combineStyles(widthClass, headerGapClass)}>
				{Con}
			</ContentArea>
			<Search />
		</div>
	);
};

export default Layout;
