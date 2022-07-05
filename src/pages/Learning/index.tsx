import {
	createCardEvent,
	createLearningSession,
	getLearningCards,
} from "api/deck";
import { ReactComponent as BadAnswer } from "assets/icons/badButton.svg";
import { ReactComponent as GoodAnswer } from "assets/icons/goodButton.svg";
import Button from "components/Button";
import CardContainer from "components/Card/CardContainer";
import CardEditor from "components/Card/CardEditor";
import BottomContainer from "components/FormBottom";
import Loader from "components/Loader";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import ProgressIndicator from "components/ProgressIndicator";
import SimpleButton from "components/SimpleButton";
import Spacer from "components/Spacer";
import Text from "components/Text";
import useStore from "hooks/useStore";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CardI, DeckI, LearningCardI, LearningSessionI } from "types/deck";

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

const getCard = (deck: DeckI, cardID: string) => {
	const card = deck.cards.find(card => card.id === cardID);
	if (!card) {
		return null;
	}
	return card;
};

const Learning = () => {
	const { deckID } = useParams();
	const deck = useStore(state => state.decks.find(d => d.id === deckID));
	if (!deckID || !deck) return <Navigate to="404" />;

	const [curCard, setCurCard] = useState<CardI>({
		question: "",
		answer: "",
		id: "",
		deckID: "",
	});
	const [startedAt, setStartedAt] = useState<Date | undefined>(undefined);
	const [finishedAt, setFinishedAt] = useState<Date | undefined>(undefined);

	const [learningCards, setLearningCards] = useState<
		LearningCardI[] | undefined
	>(undefined);

	const [numberLearningCards, setNumberLearningCards] = useState(0);

	const [pageState, setPageState] = useState<pageStates>(pageStates.LOADING);

	useEffect(() => {
		const fetch = async () => {
			const cards = await getLearningCards(
				deckID,
				deck.cards.map(card => card.id),
			);
			setLearningCards(cards);
			setNumberLearningCards(cards.length);
			setStartedAt(new Date());

			if (cards.length === 0) {
				setPageState(pageStates.LEARNED);
				return;
			} else {
				setPageState(pageStates.LEARNING);
			}

			const card = getCard(deck, cards[0].cardID);

			//TODO throw proper error
			if (!card) throw Error("Could not find card!");
			setCurCard(card);
		};

		fetch();
	}, []);

	const [learningSession, setLearningSession] = useState<
		LearningSessionI | undefined
	>(undefined);

	useEffect(() => {
		const fetch = async () => {
			const session = await createLearningSession(deckID);
			setLearningSession(session);
		};

		fetch();
	}, []);

	const [showAnswer, setShowAnswer] = useState(false);

	const onAnswer = useCallback(
		async (correct: boolean) => {
			if (!learningSession || !startedAt || !finishedAt || !learningCards) {
				return;
			}

			const event = {
				deckID,
				cardID: curCard.id,
				learningSessionID: learningSession.id,
				startedAt: startedAt,
				finishedAt: finishedAt,
				correct,
			};

			createCardEvent(event);

			const curLearningCard = learningCards[0];
			const newLearningCards = learningCards.slice(1);

			if (!correct) {
				newLearningCards.push(curLearningCard);
			} else if (learningCards.length == 1) {
				/* answer was correct and we have no cards left */
				setPageState(pageStates.FINISHED);
				return;
			}

			setLearningCards(newLearningCards);

			const card = getCard(deck, newLearningCards[0].cardID);
			if (!card) throw Error("Could not find card!");
			setCurCard(card);
			setShowAnswer(false);
			setStartedAt(new Date());
			setFinishedAt(undefined);
		},
		[deckID, curCard.id, learningSession?.id, startedAt, finishedAt],
	);

	const onShowAnswer = () => {
		setShowAnswer(true);
		setFinishedAt(new Date());
	};

	const navigate = useNavigate();

	let Component = null;

	switch (pageState) {
		case pageStates.LOADING:
			Component = <Loader size="large" />;
			break;
		case pageStates.LEARNING:
			Component = (
				<>
					<ProgressIndicator
						total={numberLearningCards || 0}
						progress={learningCards ? numberLearningCards - learningCards.length : 0}
					/>
					<Spacer spacing={2} />
					<CardContainer disableTopBoarder={false} color={deck.color}>
						<CardEditor
							key={curCard.id}
							toolbarColor={deck.color}
							readOnly={true}
							question={curCard.question}
							answer={curCard.answer}
							hideAnswer={!showAnswer}
							onClickShowAnswer={onShowAnswer}
							setQuestion={() => undefined}
							setAnswer={() => undefined}
						/>
					</CardContainer>
					<Spacer spacing={2} />
					<BottomContainer className={style.bottom_container}>
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
				</>
			);
			break;
		case pageStates.FINISHED:
			Component = (
				<LearningFinished deck={deck} totalNoCards={numberLearningCards || 0} />
			);
			break;
		case pageStates.LEARNED:
			Component = <NoLearning deck={deck} />;
			break;
	}

	return (
		<Modal>
			<ModalLayout onClose={() => navigate(`/decks/${deckID}`)}>
				<div className={style.learning_container}>
					<Text className={style.align_left}>{deck.name}</Text>
					<Spacer spacing={1} />
					{Component}
				</div>
			</ModalLayout>
		</Modal>
	);
};

export default Learning;
