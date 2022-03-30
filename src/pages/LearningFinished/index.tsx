import { ReactComponent as LogoIcon } from "assets/img/logo.svg";
import Button from "components/Button";
import BottomContainer from "components/FormBottom";
import Header from "components/Header";
import MemoryStabilityIndicator from "components/MemoryStabilityIndicator";
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
			<Text>{deck.name}</Text>
			<LogoIcon />
			<Header kind="h2">You finished learning</Header>
			<Header kind="h2" color="secondary">
				{deck.totalLearningCards} {deck.totalLearningCards === 1 ? "card" : "cards"}
			</Header>
			<Header kind="h2">This deck is now on fire!</Header>
			<div className={style.indicator}>
				<MemoryStabilityIndicator
					styles={{ width: "50px", height: "50px" }}
					probability={deck.averageRecallProbability}
					fill={"darkblue"}
				></MemoryStabilityIndicator>
			</div>
			<Text className={style.center}>Come back tomorrow to keep it burning</Text>
			<BottomContainer>
				<Link to={`/decks/${deckID}`}>
					<Button>Return to deck</Button>
				</Link>
			</BottomContainer>
		</div>
	);
};

export default LearningFinished;
