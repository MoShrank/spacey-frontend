import { ReactComponent as Arrow } from "assets/icons/arrow.svg";
import { ReactComponent as CardsIcon } from "assets/icons/cards.svg";
import IconButton from "components/IconButton";
import SmallDeleteDialog from "components/SmallDeleteDialog";
import { useNavigate } from "react-router-dom";
import colors from "styles/colors";
import { ProcessingStatus } from "types/content";

import style from "./style.module.scss";

interface ContentToolbarPropsI {
	onGenerateCards: (e: React.MouseEvent<HTMLElement>) => void;
	handleDelete: () => void;
	processingStatus: ProcessingStatus;
}

const ContentToolbar = ({
	onGenerateCards,
	handleDelete,
	processingStatus,
}: ContentToolbarPropsI) => {
	const navigate = useNavigate();

	return (
		<div className={style.icon_container}>
			<IconButton
				icon={<Arrow fill={colors.darkblue} />}
				onClick={() => navigate("/")}
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
