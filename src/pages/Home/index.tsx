import { getDecks } from "actions/deck";
import Deck from "components/Deck";
import FloatingButton from "components/FloatingButton";
import Header from "components/Header";
import ListContainer from "components/ListContainer";
import Loader from "components/Loader";
import Text from "components/Text";
import useAPIFetch from "hooks/useAPIFetch";
import { Link } from "react-router-dom";
import { DeckI } from "types/deck";

import "./style.scss";

const Hint = () => (
	<Text className="hint" color="lightgrey">
		Create your first deck here on the plus button below
	</Text>
);

const Home = () => {
	const [loading, , decks] = useAPIFetch("decks", getDecks);

	if (loading) return <Loader size="large"></Loader>;

	return (
		<div className="deck_overview_container">
			<Header kind="h1">Your Decks</Header>
			{decks && decks.length ? (
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
			<Link className="floating_container" to="/deck/new">
				<FloatingButton />
			</Link>
		</div>
	);
};

export default Home;
