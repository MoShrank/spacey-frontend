import React from "react";

import style from "./style.module.scss";

interface ListContainerProps {
	spacing?: number;
	children: React.ReactNode;
}

const ListContainer = ({ children }: ListContainerProps) => {
	return <div className={style.container}>{children}</div>;
};

export default ListContainer;
