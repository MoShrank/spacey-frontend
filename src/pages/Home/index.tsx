import { getDecks } from "actions/deck";
import Deck from "components/Deck";
import FloatingButton from "components/FloatingButton";
import Header from "components/Header";
import HeaderContainer from "components/HeaderContainer";
import Hint from "components/Hint";
import Layout from "components/Layout";
import ListContainer from "components/ListContainer";
import Loader from "components/Loader";
import Spacer from "components/Spacer";
import useAPIFetch from "hooks/useAPIFetch";
import { Link } from "react-router-dom";
import { DeckI } from "types/deck";

const Home = () => {
	const [loading, , decks] = useAPIFetch("decks", getDecks);

	if (loading) return <Loader size="large"></Loader>;

	return (
		<Layout width="full">
			<HeaderContainer>
				<Header kind="h2">Your Decks</Header>
				<Link to="/deck/new">
					<FloatingButton />
				</Link>
			</HeaderContainer>
			<Spacer spacing={2} />
			{decks && decks.length ? (
				<ListContainer spacing={3}>
					{decks.map((deck: DeckI) => (
						<Link key={deck.id} to={`decks/${deck.id}`}>
							<Deck deck={deck} />
						</Link>
					))}
				</ListContainer>
			) : (
				<Hint>No decks yet. Click the plus button to add a deck.</Hint>
			)}
		</Layout>
	);
};

export default Home;
