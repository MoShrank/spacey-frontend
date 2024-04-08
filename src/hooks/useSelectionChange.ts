import { useEffect } from "react";

const useSelectionChange = (
	callback: (selection: Selection) => void,
	ref?: React.RefObject<HTMLDivElement>,
) => {
	useEffect(() => {
		const handleSelectionChange = () => {
			const selection = window.getSelection();
			if (selection && !selection.isCollapsed) {
				if (ref?.current && !ref.current.contains(selection.anchorNode)) return;

				callback(selection);
			}
		};

		document.addEventListener("selectionchange", handleSelectionChange);

		return () => {
			document.removeEventListener("selectionchange", handleSelectionChange);
		};
	}, [callback]);
};

export default useSelectionChange;
