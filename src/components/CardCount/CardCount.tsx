import FlashcardsIcon from "assets/icons/flashcards.svg";
import Text from "components/Text";

import "./style.scss";

const CardCount = ({ count }: { count: number }) => {
	return (
		<div className="flashcards">
			<img src={FlashcardsIcon} alt="flascards icon" />
			<Text color="lightgrey">{count} cards</Text>
		</div>
	);
};

export default CardCount;
