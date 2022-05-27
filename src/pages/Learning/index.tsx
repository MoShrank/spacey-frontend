import {
	createLearningSessionAction,
	finishLearningSessionAction,
	getLearningCardsAction,
	setRecallProbability,
} from "actions/deck";
import { answerCardAction } from "actions/deck";
import { ReactComponent as BadAnswer } from "assets/icons/badButton.svg";
import { ReactComponent as GoodAnswer } from "assets/icons/goodButton.svg";
import Button from "components/Button";
import CardContainer from "components/CardContainer";
import BottomContainer from "components/FormBottom";
import Loader from "components/Loader";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
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
import { store, useGlobalState } from "store/store";
import { CardI } from "types/deck";
import { DeckI } from "types/deck";

import LearningFinished from "./LearningFinished";
import NoLearning from "./NoLearning";
import style from "./style.module.scss";

const Floating = ({ children }: { children: React.ReactNode }) => {
	return <div className={style.floating_button_container}>{children}</div>;
};

enum pageStates {
	LOADING = "loading",
	LEARNING = "learning",
	FINISHED = "finished",
	LEARNED = "learned",
}

const Learning = () => {
	const { deckID } = useParams();
	const [decks] = useGlobalState<DeckI[]>("decks");
	const deck = decks.find(d => d.id === deckID);
	if (!deckID || !deck) return <Navigate to="404" />;

	const [learningCardsLoading, , learningCards] = useAPIFetch(
		"deck",
		getLearningCardsAction,
		[deckID, deck.cards.map(card => card.id)],
	);

	const [learningSessionLoading, , learningSession] = useAPIFetch(
		"learningSession",
		createLearningSessionAction,
		[deckID],
	);

	let initialPageState;

	if (learningCardsLoading || learningSessionLoading)
		initialPageState = pageStates.LOADING;
	else if (learningCards.learningOrder.length === 0)
		initialPageState = pageStates.LEARNED;
	else initialPageState = pageStates.LEARNING;

	const [pageState, setPageState] = useState(initialPageState);

	const [showAnswer, setShowAnswer] = useState(false);
	const [, , answerCard] = useAction("deck", answerCardAction);

	const [, , finishedLearningSession] = useAction(
		"learningSession",
		finishLearningSessionAction,
	);

	const [curCard, setCurCard] = useState<CardI>({
		question: "",
		answer: "",
		id: "",
		deckID: "",
	});
	const [startedAt, setStartedAt] = useState<Date | undefined>(new Date());
	const [finishedAt, setFinishedAt] = useState<Date | undefined>(undefined);

	const navigate = useNavigate();

	useEffect(() => {
		if (learningCards) {
			//case: no cards in learning session
			if (learningCards.totalLearningCards <= 0) {
				setPageState(pageStates.LEARNED);
			}
			//case: no cards left from learning session = learning finished
			else if (
				learningCards.totalLearningCards > 0 &&
				learningCards.learningOrder.length === 0
			) {
				finishedLearningSession(learningSession).then(() => {
					store.emit("decks", setRecallProbability(deckID, 1));
					setPageState(pageStates.FINISHED);
				});
			}
			// case: cards left in learning session
			else {
				const card = deck.cards.find(
					card => card.id === learningCards.learningOrder[0].cardID,
				);
				if (card) {
					setCurCard(card);
					setPageState(pageStates.LEARNING);
				}
			}
		}
	}, [learningCards]);

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

	let Component = null;

	switch (pageState) {
		case pageStates.LOADING:
			Component = <Loader size="large" />;
			break;
		case pageStates.LEARNING:
			Component = (
				<div className={style.learning_container}>
					<ProgressIndicator
						total={learningCards.totalLearningCards}
						progress={
							learningCards.totalLearningCards - learningCards.learningOrder.length
						}
					/>
					<Spacer spacing={2} />
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
					<Spacer spacing={6} />
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
			break;
		case pageStates.FINISHED:
			Component = <LearningFinished deck={deck} />;
			break;
		case pageStates.LEARNED:
			Component = <NoLearning deck={deck} />;
			break;
	}

	return (
		<Modal>
			<ModalLayout onClose={() => navigate(`/decks/${deckID}`)}>
				<Text className={style.align_left}>{deck.name}</Text>
				<Spacer spacing={1} />
				{Component}
			</ModalLayout>
		</Modal>
	);
};

export default Learning;
