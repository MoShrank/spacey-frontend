import CardCount from "components/CardCount/CardCount";
import MemoryStabilityIndicator from "components/MemoryStabilityIndicator";
import Text from "components/Text";
import { DeckI } from "types/deck";

import "./style.scss";

const Deck = (props: { deck: DeckI }) => {
	return (
		<div className="deck_container">
			<div style={{ background: props.deck.color }} className="deck_header"></div>
			<div className="deck_body">
				<Text className="text">{props.deck.name}</Text>
				<div className="deck_info">
					<CardCount count={props.deck.cards.length} />
					<MemoryStabilityIndicator
						probability={props.deck.averageRecallProbability}
						styles={{ width: "24px", height: "24px" }}
						fill={"darkblue"}
					></MemoryStabilityIndicator>
				</div>
			</div>
		</div>
	);
};

export default Deck;
