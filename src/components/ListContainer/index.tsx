import React, { useEffect } from "react";

import style from "./style.module.scss";

interface ListContainerProps {
	children: React.ReactNode;
}

const ListContainer = (props: ListContainerProps) => {
	const ref = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			const yOffset = ref.current.getBoundingClientRect().y;
			ref.current.style.maxHeight = `${window.innerHeight - yOffset}px`;
		}
	}, [ref]);

	return (
		<div ref={ref} className={style.container}>
			{props.children}
		</div>
	);
};

export default ListContainer;
