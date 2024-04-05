import React, { forwardRef } from "react";

import style from "./style.module.scss";

interface CustomContextMenuContainerI {
	children: React.ReactNode;
	x: number;
	y: number;
}
// create custom contenxt menu component with forwardedRef

interface VerticalLineI {
	color?: string;
	thickness?: number;
	style?: React.CSSProperties;
}

const VerticalLine: React.FC<VerticalLineI> = ({
	color = "#ccc",
	thickness = 1,
	style,
}) => {
	const defaultStyle: React.CSSProperties = {
		borderLeft: `${thickness}px solid ${color}`,
		alignSelf: "stretch",
	};

	const mergedStyle = { ...defaultStyle, ...style };

	return <div style={mergedStyle}></div>;
};

const addSeperator = (children: React.ReactNode) => {
	const childrenArray = React.Children.toArray(children);
	const seperatedChildren: React.ReactNode[] = [];

	childrenArray.forEach((child, index) => {
		seperatedChildren.push(child);
		if (index !== childrenArray.length - 1) {
			seperatedChildren.push(<VerticalLine key={index} />);
		}
	});

	return seperatedChildren;
};

const ContextMenuContainer = forwardRef<
	HTMLDivElement,
	CustomContextMenuContainerI
>(({ children, x, y }, ref) => {
	return (
		<div
			ref={ref}
			className={style.context_menu_container}
			style={{
				top: y,
				left: x,
			}}
		>
			{addSeperator(children)}
		</div>
	);
});

ContextMenuContainer.displayName = "ContextMenuContainer";

export default ContextMenuContainer;
