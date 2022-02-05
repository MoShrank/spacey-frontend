import React from "react";

import "./style.scss";

interface ListContainerProps {
	children: React.ReactNode;
}

const ListContainer = (props: ListContainerProps) => {
	return <div>{props.children}</div>;
};

export default ListContainer;
