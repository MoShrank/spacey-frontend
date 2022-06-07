import React from "react";

import style from "./style.module.scss";

interface ListContainerProps {
	rowSpacing?: number;
	columnSpacing?: number;
	childWidth?: number;
	children: React.ReactNode;
}

const ListContainer = ({
	children,
	rowSpacing = 2,
	columnSpacing = 2,
	childWidth = 224,
}: ListContainerProps) => {
	return (
		<div
			style={{
				gridTemplateColumns: `repeat(auto-fit, ${childWidth}px)`,
				rowGap: `${rowSpacing * 8}px`,
				columnGap: `${columnSpacing * 8}px`,
			}}
			className={style.container}
		>
			{children}
		</div>
	);
};

export default ListContainer;
