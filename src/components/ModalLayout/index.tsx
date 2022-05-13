import { ReactComponent as CancelIcon } from "assets/icons/exit.svg";
import Layout from "components/Layout";

import style from "./style.module.scss";

const ModalLayout = ({
	children,
	onClose,
	width = "s",
}: {
	children: React.ReactNode;
	onClose: () => void;
	width?: "s" | "full" | "desktop";
}) => (
	<div className={style.popup_layout}>
		<Layout width={width} navbar={false}>
			<CancelIcon className={style.close_button} onClick={onClose} />
			{children}
		</Layout>
	</div>
);

export default ModalLayout;
