import { getDecks } from "api/deck";
import Deck from "components/Deck";
import FloatingButton from "components/FloatingButton";
import Header from "components/Header";
import ListContainer from "components/ListContainer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "store/store";
import { DeckI } from "types/deck";

import "./style.scss";

const Home = () => {
	const [decks, setDecks] = useGlobalState<Array<DeckI>>("decks", []);

	useEffect(() => {
		getDecks().then(decks => setDecks(decks));
	}, []);

	return (
		<div className="deck_overview_container">
			<Header kind="h1">Your Decks</Header>
			<ListContainer>
				{decks.map((deck: DeckI) => (
					<Link key={deck.id} to={`decks/${deck.id}`}>
						<Deck deck={deck} />
					</Link>
				))}
			</ListContainer>
			<Link className="floating_container" to="/new/deck">
				<FloatingButton />
			</Link>
		</div>
	);
};

export default Home;
