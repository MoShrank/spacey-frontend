import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface ContentWidthConstraintI {
	children: React.ReactNode;
	className?: string;
}

const ContentWidthConstraint = ({
	children,
	className,
}: ContentWidthConstraintI) => {
	return (
		<div className={combineStyles(style.container, className)}>{children}</div>
	);
};

export default ContentWidthConstraint;
