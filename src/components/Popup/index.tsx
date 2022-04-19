import useLockBodyScroll from "hooks/useScrollLock";
import { forwardRef } from "react";

import style from "./style.module.scss";

interface PopupI {
	children: React.ReactNode;
}

const Popup = forwardRef<HTMLDivElement, PopupI>(({ children }, ref) => {
	useLockBodyScroll();
	return (
		<div className={style.container} ref={ref}>
			{children}
		</div>
	);
});

Popup.displayName = "Popup";

export default Popup;
