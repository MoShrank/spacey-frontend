import CardCount from "components/CardCount/CardCount";
import { DeckI } from "types/deck";

import "./style.scss";

const Deck = (props: { deck: DeckI }) => {
	return (
		<div className="deck_container">
			<div style={{ background: props.deck.color }} className="deck_header"></div>
			<div className="deck_body">
				<div className="text">{props.deck.name}</div>
				<CardCount count={props.deck.cards.length} />
			</div>
		</div>
	);
};

export default Deck;
