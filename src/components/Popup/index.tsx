import Modal from "components/Modal";
import useLockBodyScroll from "hooks/useScrollLock";
import { forwardRef } from "react";

import style from "./style.module.scss";

const Overlay = () => (
	<Modal>
		<div className={style.overlay}></div>
	</Modal>
);

interface PopupI {
	children: React.ReactNode;
	className: string;
}

const Popup = forwardRef<HTMLDivElement, PopupI>(
	({ children, className }, ref) => {
		useLockBodyScroll();

		return (
			<>
				<Overlay />
				<div className={className} ref={ref}>
					{children}
				</div>
			</>
		);
	},
);

Popup.displayName = "Popup";

export default Popup;
