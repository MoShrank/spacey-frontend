import React from "react";

import style from "./style.module.scss";

interface ListContainerProps {
	children: React.ReactNode;
}

const ListContainer = (props: ListContainerProps) => {
	return <div className={style.container}>{props.children}</div>;
};

export default ListContainer;
