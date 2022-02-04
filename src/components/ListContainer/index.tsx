import React from "react";

import "./style.scss";

interface ListContainerProps {
	children: Array<React.ReactNode>;
}

const ListContainer = (props: ListContainerProps) => {
	return <div className="list_container">{props.children}</div>;
};

export default ListContainer;
