import { getDecks } from "actions/deck";
import Deck from "components/Deck";
import FloatingButton from "components/FloatingButton";
import Header from "components/Header";
import HeaderContainer from "components/HeaderContainer";
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
			<HeaderContainer>
				<Header kind="h2">Your Decks</Header>
				<Link to="/deck/new">
					<FloatingButton />
				</Link>
			</HeaderContainer>
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
		</div>
	);
};

export default Home;
