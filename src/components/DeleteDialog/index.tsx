import { ReactComponent as TrashIcon } from "assets/icons/trash.svg";
import Text from "components/Text";
import { useState } from "react";
import colors from "styles/colors";

import style from "./style.module.scss";

interface DeleteDialogProps {
	onDelete: () => void;
	children?: string;
}

const DeleteDialog = ({ onDelete, children }: DeleteDialogProps) => {
	const [show, setShow] = useState(false);
	const handleDelete = () => {
		onDelete();
		setShow(false);
	};

	return (
		<div
			onClick={show ? handleDelete : () => setShow(true)}
			className={style.delete_dialog_container}
		>
			<TrashIcon fill={colors.lightgray} />
			<Text color="lightgrey">{show ? "Tag Again to Delete" : children}</Text>
		</div>
	);
};

export default DeleteDialog;
