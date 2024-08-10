import { ReactComponent as Arrow } from "assets/icons/arrow.svg";
import { ReactComponent as CardsIcon } from "assets/icons/cards.svg";
import { ReactComponent as CheckMark } from "assets/icons/checkRead.svg";
import { ReactComponent as ZoomIcon } from "assets/icons/zoom.svg";
import IconButton from "components/IconButton";
import SmallDeleteDialog from "components/SmallDeleteDialog";
import { useNavigate } from "react-router-dom";
import colors from "styles/colors";
import { ProcessingStatus } from "types/content";

import style from "./style.module.scss";

interface ContentToolbarPropsI {
	handleGenerateCards: (e: React.MouseEvent<HTMLElement>) => void;
	handleDelete: () => void;
	handleOpenFocusModus: () => void;
	handleCheckRead?: () => unknown;
	processingStatus: ProcessingStatus;
}

const ContentToolbar = ({
	handleGenerateCards,
	handleDelete,
	handleOpenFocusModus,
	handleCheckRead,
	processingStatus,
}: ContentToolbarPropsI) => {
	const navigate = useNavigate();

	return (
		<div className={style.icon_container}>
			<IconButton
				icon={<Arrow fill={colors.darkblue} />}
				onClick={() => navigate("/")}
			/>
			{handleCheckRead && (
				<IconButton
					icon={<CheckMark fill={colors.darkblue} />}
					onClick={handleCheckRead}
				/>
			)}
			<IconButton
				icon={<ZoomIcon />}
				onClick={handleOpenFocusModus}
				disabled={processingStatus != "processed"}
			/>
			<IconButton
				icon={<CardsIcon fill={colors.darkblue} />}
				onClick={handleGenerateCards}
				disabled={processingStatus != "processed"}
			/>
			<SmallDeleteDialog
				onDelete={handleDelete}
				disabled={processingStatus == "processing"}
			/>
		</div>
	);
};

export default ContentToolbar;
