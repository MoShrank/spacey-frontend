import useOnClickOutside from "hooks/useClickOutside";
import React, { useRef, useState } from "react";

const useContextMenu = () => {
	const [state, setState] = useState({ visible: false, x: 0, y: 0 });

	const contextMenuRef = useRef(null);

	const show = (e: React.MouseEvent | React.TouchEvent) => {
		e.preventDefault();
		e.stopPropagation();
		let x = 0;
		let y = 0;

		if ("touches" in e) {
			x = e.touches[0].clientX;
			y = e.touches[0].clientY;
		} else if ("clientX" in e) {
			x = e.clientX;
			y = e.clientY;
		}

		setState({ visible: true, x, y });
	};

	const hide = () => {
		setState({ ...state, visible: false });
	};

	useOnClickOutside(contextMenuRef, hide);

	return {
		state,
		show,
		hide,
		contextMenuRef,
	};
};

export default useContextMenu;
