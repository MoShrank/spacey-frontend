import Button from "components/Button";
import Header from "components/Header";
import Text from "components/Text";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGlobalState } from "store/store";
import { DeckI } from "types/deck";

import style from "./style.module.scss";

const LearningFinished = () => {
	const { deckID } = useParams();

	const [deck, setDeck] = useGlobalState<DeckI | undefined>("deck");

	if (!deck || deckID !== deck.id) return <Navigate to="/404" />;

	useEffect(() => {
		return () => setDeck(undefined);
	}, []);

	return (
		<div className={style.container}>
			<Header kind="h2">Congrats</Header>
			<Text>come back tomorrow for more </Text>
			<Link to={`/decks/${deckID}`}>
				<Button>Return to deck</Button>
			</Link>
		</div>
	);
};

export default LearningFinished;
