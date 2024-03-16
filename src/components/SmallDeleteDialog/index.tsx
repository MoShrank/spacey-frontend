import { ReactComponent as TrashIcon } from "assets/icons/trash.svg";
import IconButton from "components/IconButton";
import { useState } from "react";
import colors from "styles/colors";

interface DeleteDialogProps {
	onDelete: () => void;
}

const SmallDeleteDialog = ({ onDelete }: DeleteDialogProps) => {
	const [shouldConfirm, setShouldConfirm] = useState(false);

	const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();

		if (shouldConfirm) {
			onDelete();
		} else {
			setShouldConfirm(true);
		}
	};

	const color = shouldConfirm ? colors.rederror : colors.darkblue;

	return <IconButton icon={<TrashIcon fill={color} />} onClick={handleDelete} />;
};

export default SmallDeleteDialog;
