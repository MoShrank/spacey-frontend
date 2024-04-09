import useOnClickOutside from "hooks/useClickOutside";
import useMediaQuery from "hooks/useMediaQuery";
import { useCallback, useRef, useState } from "react";

const useContextMenu = () => {
	const [state, setState] = useState({ visible: false, x: 0, y: 0 });

	const contextMenuRef = useRef(null);

	const isMobile = useMediaQuery("(max-width: 500px)");

	const calcContextMenuPosition = useCallback(
		(range: Range, root: HTMLElement, noContextItems = 1) => {
			const rect = range.getBoundingClientRect();
			const readerRootRect = root.getBoundingClientRect();

			// show context menu above and in the
			// middle of the selected text
			const contextMenuHeight = 40;
			const noContextMenuItems = noContextItems;
			const contextMenuWidth =
				40 * noContextMenuItems + 1 * (noContextMenuItems + 1); // 40px per item + 1px border
			console.log("contextMenuWidth", contextMenuWidth);
			const x = rect.x + rect.width / 2 - contextMenuWidth / 2 - readerRootRect.x;
			let y = rect.y - readerRootRect.y;
			if (isMobile) {
				y += rect.height + 5;
			} else {
				y -= contextMenuHeight + 5;
			}

			return { x, y };
		},
		[isMobile],
	);

	const show = (pos: { x: number; y: number }) => {
		setState({ visible: true, ...pos });
	};

	const hide = () => {
		setState({ ...state, visible: false });
	};

	useOnClickOutside(contextMenuRef, hide);

	return {
		state,
		show,
		hide,
		calcContextMenuPosition,
		contextMenuRef,
	};
};

export default useContextMenu;
