import { ReactComponent as CardsIcon } from "assets/icons/cards.svg";
import Text from "components/Text";
import colors from "styles/colors";

import style from "./style.module.scss";

const CardCount = ({ count }: { count: number }) => {
	return (
		<div className={style.cards}>
			<CardsIcon fill={colors.lightgray} />
			<Text color="lightgrey">{count} cards</Text>
		</div>
	);
};

export default CardCount;
