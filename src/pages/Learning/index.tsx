import {
	createLearningSessionAction,
	finishLearningSessionAction,
	getDeckAction,
	getLearningCardsAction,
} from "actions/deck";
import { answerCardAction } from "actions/deck";
import { ReactComponent as BadAnswer } from "assets/icons/badButton.svg";
import { ReactComponent as GoodAnswer } from "assets/icons/goodButton.svg";
import Button from "components/Button";
import CardContainer from "components/CardContainer";
import BottomContainer from "components/FormBottom";
import Loader from "components/Loader";
import ProgressIndicator from "components/ProgressIndicator";
import SimpleButton from "components/SimpleButton";
import Spacer from "components/Spacer";
import Text from "components/Text";
import useAPIFetch from "hooks/useAPIFetch";
import useAction from "hooks/useAction";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "store/store";
import { CardI, LearningSessionI } from "types/deck";
import { DeckI } from "types/deck";

import style from "./style.module.scss";

const Floating = ({ children }: { children: React.ReactNode }) => {
	return <div className={style.floating_button_container}>{children}</div>;
};

const Learning = () => {
	const { deckID } = useParams();

	if (!deckID) return <Navigate to="/404" />;

	const [deck, setDeck] = useGlobalState<DeckI | undefined>("deck");
	const [, setLearningSession] = useGlobalState<LearningSessionI | undefined>(
		"learningSession",
	);

	const [deckLoading, deckError] = useAPIFetch("deck", getDeckAction, [deckID]);
	const [learningCardsLoading, learningCardsError, getLearningCardsCall] =
		useAction("deck", getLearningCardsAction);

	const [showAnswer, setShowAnswer] = useState(false);
	const [, , answerCard] = useAction("deck", answerCardAction);
	const [, , learningSession] = useAPIFetch(
		"learningSession",
		createLearningSessionAction,
		[deckID],
	);
	const [, , finishedLearningSession] = useAction(
		"learningSession",
		finishLearningSessionAction,
	);

	const [curCard, setCurCard] = useState<CardI | undefined>(undefined);
	const [startedAt, setStartedAt] = useState<Date | undefined>(new Date());
	const [finishedAt, setFinishedAt] = useState<Date | undefined>(undefined);

	const navigate = useNavigate();

	const cleanup = () => {
		setDeck(undefined);
		setLearningSession(undefined);
	};

	useEffect(() => {
		if (deck && !deck.learningOrder) {
			getLearningCardsCall(
				deckID,
				deck.cards.map(card => card.id),
			);
		}

		if (deck?.learningOrder) {
			//case: no cards in learning session
			if (deck.totalLearningCards <= 0) {
				navigate(`/decks/${deckID}/nolearning`);
			}
			//case: no cards left from learning session = learning finished
			else if (deck.totalLearningCards > 0 && deck.learningOrder.length === 0) {
				finishedLearningSession(learningSession).then(() => {
					cleanup;
					navigate("finished");
				});
			}
			// case: cards left in learning session
			else {
				setCurCard(
					deck?.cards.find(card => card.id === deck.learningOrder[0].cardID),
				);
			}
		}
	}, [deck]);

	if (deckLoading || learningCardsLoading) {
		return <Loader size="large" />;
	}

	if (
		deckError ||
		learningCardsError ||
		!deck ||
		!deck.learningOrder ||
		!curCard
	) {
		return <Navigate to="/404" />;
	}

	const onShowAnswer = () => {
		setShowAnswer(true);
		setFinishedAt(new Date());
	};

	const onAnswer = (correct: boolean) => {
		answerCard({
			deckID,
			cardID: curCard.id,
			learningSessionID: learningSession.id,
			startedAt: startedAt,
			finishedAt: finishedAt,
			correct,
		});
		setShowAnswer(false);
		setStartedAt(new Date());
	};

	return (
		<div className={style.learning_container}>
			<Text>{deck.name}</Text>
			<ProgressIndicator
				total={deck.totalLearningCards}
				progress={deck.totalLearningCards - deck.learningOrder.length}
			/>
			<CardContainer color={deck.color}>
				<Text color="black" className={style.card_text}>
					{curCard.question}
				</Text>
				<Text color="grey" onClick={onShowAnswer} className={style.card_text}>
					{showAnswer
						? curCard.answer
						: "Click here or use the button to show answer"}
				</Text>
			</CardContainer>
			<Spacer spacing={8} />
			<BottomContainer>
				{showAnswer ? (
					<div className={style.answer_container}>
						<div>
							<Floating>
								<GoodAnswer onClick={() => onAnswer(true)} />
							</Floating>
							<Text>knew it</Text>
						</div>
						<div>
							<Floating>
								<BadAnswer onClick={() => onAnswer(false)} />
							</Floating>
							<Text>messed up</Text>
						</div>
					</div>
				) : (
					<>
						<Button onClick={onShowAnswer}>Show Answer</Button>
						<SimpleButton as={Link} to={`/decks/${deck.id}`}>
							Cancel
						</SimpleButton>
					</>
				)}
			</BottomContainer>
			<Spacer spacing={1} />
		</div>
	);
};

export default Learning;
