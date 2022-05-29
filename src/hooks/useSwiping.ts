import { useEffect } from "react";

const useSwiping = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "ArrowLeft") {
			onSwipeLeft();
		} else if (e.key === "ArrowRight") {
			onSwipeRight();
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onSwipeLeft, onSwipeRight]);
};

export default useSwiping;
