import ContentTitle from "components/ContentTitle";
import ContentWidthConstraint from "components/ContentWidthConstraint";
import Deck from "components/Deck";
import FloatingButton from "components/FloatingButton";
import Header from "components/Header";
import Hint from "components/Hint";
import Layout from "components/Layout";
import ListContainer from "components/ListContainer";
import Spacer from "components/Spacer";
import { Link } from "react-router-dom";
import { useGlobalState } from "store/store";
import { DeckI } from "types/deck";

const Home = () => {
	const [decks] = useGlobalState<DeckI[]>("decks");

	return (
		<Layout width="full">
			<ContentWidthConstraint>
				<ContentTitle>
					<Header kind="h2">Your Decks</Header>
					<Link to="/deck/new">
						<FloatingButton />
					</Link>
				</ContentTitle>
			</ContentWidthConstraint>
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
