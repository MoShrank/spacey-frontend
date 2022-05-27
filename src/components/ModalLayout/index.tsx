import { ReactComponent as CancelIcon } from "assets/icons/exit.svg";
import Layout from "components/Layout";

import style from "./style.module.scss";

const ModalLayout = ({
	children,
	onClose,
}: {
	children: React.ReactNode;
	onClose: () => void;
}) => (
	<div className={style.popup_layout}>
		<Layout navbar={false}>
			<CancelIcon className={style.close_button} onClick={onClose} />
			{children}
		</Layout>
	</div>
);

export default ModalLayout;
