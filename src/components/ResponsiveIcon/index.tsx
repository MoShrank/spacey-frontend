import React from "react";
import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface ResponsiveIconI extends React.SVGAttributes<SVGSVGElement> {
	icon: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string | undefined }
	>;
	className?: string;
}

const ResponsiveIcon = ({ icon, className, ...rest }: ResponsiveIconI) => {
	const Icon = icon;
	return <Icon className={combineStyles(style.icon, className)} {...rest} />;
};

export default ResponsiveIcon;
