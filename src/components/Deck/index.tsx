import CardCount from "components/CardCount/CardCount";
import Text from "components/Text";
import { DeckI } from "types/deck";

import "./style.scss";

const Deck = (props: { deck: DeckI }) => {
	return (
		<div className="deck_container">
			<div style={{ background: props.deck.color }} className="deck_header"></div>
			<div className="deck_body">
				<Text className="text">{props.deck.name}</Text>
				<CardCount count={props.deck.cards.length} />
			</div>
		</div>
	);
};

export default Deck;
