import { useLayoutEffect } from "react";

/*
    taken from: https://usehooks.com/page/2
*/

const useLockBodyScroll = () => {
	useLayoutEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = originalStyle;
		};
	}, []);
};

export default useLockBodyScroll;
