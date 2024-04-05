import useOnClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";

const useContextMenu = () => {
	const [state, setState] = useState({ visible: false, x: 0, y: 0 });

	const contextMenuRef = useRef(null);

	const show = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		setState({ visible: true, x: e.clientX, y: e.clientY });
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
