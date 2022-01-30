import { getDecks } from "api/deck";
import { getUserData } from "api/user";
import Deck from "components/Deck";
import FloatingButton from "components/FloatingButton";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "store/store";
import { DeckI } from "types/deck";

import "./style.scss";

const Home = () => {
	const [, setUser] = useGlobalState("user");
	const [isLoggedIn] = useGlobalState("isLoggedIn");

	const [decks, setDecks] = useGlobalState("decks", []);

	useEffect(() => {
		if (isLoggedIn) {
			getUserData().then(user => {
				setUser(user);
			});
		}
	}, []);

	useEffect(() => {
		if (isLoggedIn) {
			getDecks().then(decks => setDecks(decks));
		}
	}, [isLoggedIn]);

	return (
		<div className="deck_overview_container">
			<div className="header_container">
				<h1 className="header">Your Decks</h1>
			</div>
			<div className="decks_container">
				{decks.map((deck: DeckI) => (
					<Link key={deck.id} to={`decks/${deck.id}`}>
						<Deck deck={deck} />
					</Link>
				))}
			</div>
			<Link className="floating_container" to="/new/deck">
				<FloatingButton />
			</Link>
		</div>
	);
};

export default Home;
