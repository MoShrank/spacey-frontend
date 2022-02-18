import { getDecks } from "actions/deck";
import { updateCardAction } from "actions/deck";
import { ReactComponent as NextIcon } from "assets/icons/next.svg";
import { ReactComponent as PrevIcon } from "assets/icons/prev.svg";
import EditableCard from "components/EditableCard";
import Loader from "components/Loader";
import Text from "components/Text";
import useAPIFetch from "hooks/useAPIFetch";
import useAction from "hooks/useAction";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CardI, DeckI } from "types/deck";

import style from "./style.module.scss";

const cardEq = (
	a: { question: string; answer: string } | undefined,
	b: { question: string; answer: string } | undefined,
): boolean => {
	return a?.question === b?.question && a?.answer === b?.answer;
};

const CardDetail = () => {
	const { deckID, cardID } = useParams();
	const [loading, , decks] = useAPIFetch("decks", getDecks);
	const [editDeckLoading, editDeckError, action] = useAction(
		"decks",
		updateCardAction,
	);

	const deck = decks.find((d: DeckI) => d.id === deckID);
	const cardIdx =
		deck?.cards.findIndex((card: CardI) => card.id === cardID) ?? 0;

	const [card, setCard] = useState({
		question: deck?.cards[cardIdx].question ?? "",
		answer: deck?.cards[cardIdx].answer ?? "",
	});

	const [curCardIdx, setCardIdx] = useState(cardIdx);

	const [buttonDisabled, setButtonDisabled] = useState(true);

	useEffect(() => {
		setCard({
			question: deck?.cards[curCardIdx].question ?? "",
			answer: deck?.cards[curCardIdx].answer ?? "",
		});
	}, [curCardIdx, deck, decks]);

	useEffect(() => {
		setButtonDisabled(cardEq(card, deck?.cards[curCardIdx]));
	}, [card]);

	useEffect(() => {
		const cardID = deck?.cards[curCardIdx].id;
		navigate(`/decks/${deckID}/cards/${cardID}`);
	}, [curCardIdx]);

	const navigate = useNavigate();

	if (loading) return <Loader />;
	if (!deck) return <Navigate to="/404" />;

	const handlePrev = () => {
		if (curCardIdx === 0) setCardIdx(deck.cards.length - 1);
		else setCardIdx(curCardIdx - 1);
	};

	const handleNext = () => {
		if (curCardIdx === deck.cards.length - 1) setCardIdx(0);
		else setCardIdx(curCardIdx + 1);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		action({ ...card, deckID: deckID, id: cardID });
	};

	const handleQuestionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		setCard({
			...card,
			question: e.target.value,
		});
	};

	const handleAnswerInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		setCard({
			...card,
			answer: e.target.value,
		});
	};

	return (
		<EditableCard
			deck={deck}
			card={card}
			error={editDeckError}
			loading={editDeckLoading}
			onSubmit={handleSubmit}
			onQuestionInput={handleQuestionInput}
			onAnswerInput={handleAnswerInput}
			buttonText="Save card"
			buttonDisabled={buttonDisabled}
		>
			<div className={style.swipe_container}>
				<PrevIcon onClick={handlePrev} />
				<Text color="lightgrey">
					card {curCardIdx + 1} of {deck.cards.length}
				</Text>
				<NextIcon onClick={handleNext} />
			</div>
		</EditableCard>
	);
};

export default CardDetail;
