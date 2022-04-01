import Spacer from "components/Spacer";
import React from "react";

import style from "./style.module.scss";

interface ListContainerProps {
	spacing?: number;
	children: React.ReactNode;
}

const ListContainer = ({ children, spacing = 1 }: ListContainerProps) => {
	const totalNoChild = React.Children.count(children);

	return (
		<div className={style.container}>
			{React.Children.map(children, (child, idx) => {
				if (totalNoChild == idx + 1) return child;
				else
					return (
						<>
							{child}
							<Spacer spacing={spacing} />
						</>
					);
			})}
		</div>
	);
};

export default ListContainer;
