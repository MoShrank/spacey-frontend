import CardCount from "components/CardCount/CardCount";
import Header from "components/Header";
import MemoryStabilityIndicator from "components/MemoryStabilityIndicator";
import { Link } from "react-router-dom";
import { DeckI } from "types/deck";

import style from "./style.module.scss";

const Deck = ({ deck }: { deck: DeckI }) => {
	return (
		<Link key={deck.id} to={`decks/${deck.id}`} className={style.deck_container}>
			<div style={{ background: deck.color }} className={style.deck_header}></div>
			<div className={style.deck_body}>
				<Header kind="h3">{deck.name}</Header>
				<CardCount count={deck.cards.length} />
				<div className={style.indicator}>
					<MemoryStabilityIndicator
						probability={deck.averageRecallProbability}
						styles={{ width: "24px", height: "24px" }}
						fill={"darkblue"}
					/>
				</div>
			</div>
		</Link>
	);
};

export default Deck;
