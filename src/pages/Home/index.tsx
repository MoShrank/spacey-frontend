import { getDecks } from "api/deck";
import Deck from "components/Deck";
import FloatingButton from "components/FloatingButton";
import Header from "components/Header";
import ListContainer from "components/ListContainer";
import Text from "components/Text";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "store/store";
import { DeckI } from "types/deck";

import "./style.scss";

const Hint = () => (
	<Text className="hint" color="lightgrey">
		Create your first deck here on the plus button below
	</Text>
);

const Home = () => {
	const [decks, setDecks] = useGlobalState<Array<DeckI>>("decks", []);

	useEffect(() => {
		getDecks().then(decks => setDecks(decks));
	}, []);

	return (
		<div className="deck_overview_container">
			<Header kind="h1">Your Decks</Header>
			{decks.length ? (
				<ListContainer>
					{decks.map((deck: DeckI) => (
						<Link key={deck.id} to={`decks/${deck.id}`}>
							<Deck deck={deck} />
						</Link>
					))}
				</ListContainer>
			) : (
				<Hint />
			)}
			<Link className="floating_container" to="/new/deck">
				<FloatingButton />
			</Link>
		</div>
	);
};

export default Home;
