import { ReactComponent as CancelIcon } from "assets/icons/exit.svg";
import Layout, { widthOptions } from "components/Layout";
import ResponsiveIcon from "components/ResponsiveIcon";

import style from "./style.module.scss";

const ModalLayout = ({
	children,
	onClose,
	width = "normal",
}: {
	children: React.ReactNode;
	onClose: () => void;
	width?: widthOptions;
}) => (
	<div className={style.popup_layout}>
		<Layout width={width} navbar={false}>
			<ResponsiveIcon
				icon={CancelIcon}
				className={style.close_button}
				onClick={onClose}
			/>
			{children}
		</Layout>
	</div>
);

export default ModalLayout;
