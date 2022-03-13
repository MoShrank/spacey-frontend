import CardsIcon from "assets/icons/cards.svg";
import Text from "components/Text";

import style from "./style.module.scss";

const CardCount = ({ count }: { count: number }) => {
	return (
		<div className={style.cards}>
			<img src={CardsIcon} alt="flascards icon" />
			<Text color="lightgrey">{count} cards</Text>
		</div>
	);
};

export default CardCount;
