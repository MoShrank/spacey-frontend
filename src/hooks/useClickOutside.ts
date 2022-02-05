import { useEffect } from "react";

/*
    copied from: https://usehooks.com/page/3
*/

function useOnClickOutside(
	ref: React.RefObject<HTMLElement>,
	handler: (event: MouseEvent | TouchEvent) => void,
) {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
				return;
			}
			handler(event);
		};
		document.addEventListener("mousedown", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
		};
	}, [ref, handler]);
}

export default useOnClickOutside;
