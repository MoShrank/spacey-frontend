import useOnClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";

// eslint-disable-next-line
const useContextMenu = () => {
	const [state, setState] = useState({ visible: false, x: 0, y: 0 });

	const contextMenuRef = useRef(null);

	const show = (
		e?: React.MouseEvent | React.TouchEvent,
		x_pos?: number,
		y_pos?: number,
	) => {
		let x = 0;
		let y = 0;

		if (x_pos) x = x_pos;
		if (y_pos) y = y_pos;

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
