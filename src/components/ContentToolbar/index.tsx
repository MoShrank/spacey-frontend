import { ReactComponent as Arrow } from "assets/icons/arrow.svg";
import { ReactComponent as CardsIcon } from "assets/icons/cards.svg";
import IconButton from "components/IconButton";
import SmallDeleteDialog from "components/SmallDeleteDialog";
import { useNavigate } from "react-router-dom";
import colors from "styles/colors";

import style from "./style.module.scss";

interface ContentToolbarPropsI {
	onGenerateCards: (e: React.MouseEvent<HTMLElement>) => void;
	handleDelete: () => void;
}

const ContentToolbar = ({
	onGenerateCards,
	handleDelete,
}: ContentToolbarPropsI) => {
	const navigate = useNavigate();

	return (
		<div className={style.icon_container}>
			<IconButton
				icon={<Arrow fill={colors.darkblue} />}
				onClick={() => navigate(-1)}
			/>
			<IconButton
				icon={<CardsIcon fill={colors.darkblue} />}
				onClick={onGenerateCards}
			/>
			<SmallDeleteDialog onDelete={handleDelete} />
		</div>
	);
};

export default ContentToolbar;
