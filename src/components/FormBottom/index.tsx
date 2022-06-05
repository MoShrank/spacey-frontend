import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface BottomContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const BottomContainer = ({
	children,
	className,
	...rest
}: BottomContainerProps) => {
	return (
		<div className={combineStyles(style.bottom, className)} {...rest}>
			{children}
		</div>
	);
};

export default BottomContainer;
