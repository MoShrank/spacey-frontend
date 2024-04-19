import { ReactComponent as Arrow } from "assets/icons/arrow.svg";
import { ReactComponent as CardsIcon } from "assets/icons/cards.svg";
import { ReactComponent as ZoomIcon } from "assets/icons/zoom.svg";
import { ReactComponent as ZoomPDFInIcon } from "assets/icons/zoom_in.svg";
import { ReactComponent as ZoomPDFOutIcon } from "assets/icons/zoom_out.svg";
import IconButton from "components/IconButton";
import SmallDeleteDialog from "components/SmallDeleteDialog";
import { useNavigate } from "react-router-dom";
import colors from "styles/colors";
import { ProcessingStatus } from "types/content";

import style from "./style.module.scss";

interface ContentToolbarPropsI {
	onGenerateCards: (e: React.MouseEvent<HTMLElement>) => void;
	handleDelete: () => void;
	handleOpenFocusModus: () => void;
	zoomIn: () => void;
	zoomOut: () => void;
	isPDF: boolean;
	processingStatus: ProcessingStatus;
}

const ContentToolbar = ({
	onGenerateCards,
	handleDelete,
	handleOpenFocusModus,
	zoomIn,
	zoomOut,
	isPDF,
	processingStatus,
}: ContentToolbarPropsI) => {
	const navigate = useNavigate();

	return (
		<div className={style.icon_container}>
			<IconButton
				icon={<Arrow fill={colors.darkblue} />}
				onClick={() => navigate("/")}
			/>

			{isPDF && (
				<>
					<IconButton
						icon={<ZoomPDFInIcon />}
						onClick={zoomIn}
						disabled={processingStatus != "processed"}
					/>
					<IconButton
						icon={<ZoomPDFOutIcon />}
						onClick={zoomOut}
						disabled={processingStatus != "processed"}
					/>
				</>
			)}

			<IconButton
				icon={<ZoomIcon />}
				onClick={handleOpenFocusModus}
				disabled={processingStatus != "processed"}
			/>
			<IconButton
				icon={<CardsIcon fill={colors.darkblue} />}
				onClick={onGenerateCards}
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
