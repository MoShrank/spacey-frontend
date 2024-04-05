import { useState } from "react";

const useContextMenu = () => {
	const [state, setState] = useState({ visible: false, x: 0, y: 0 });

	const show = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		setState({ visible: true, x: e.clientX, y: e.clientY });
	};

	const hide = () => {
		setState({ ...state, visible: false });
	};

	return {
		state,
		show,
		hide,
	};
};

export default useContextMenu;
