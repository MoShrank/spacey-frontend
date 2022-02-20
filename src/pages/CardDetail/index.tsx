import { deleteCardAction, getDecks } from "actions/deck";
import { updateCardAction } from "actions/deck";
import { ReactComponent as NextIcon } from "assets/icons/next.svg";
import { ReactComponent as PrevIcon } from "assets/icons/prev.svg";
import Button from "components/Button";
import DeleteDialog from "components/DeleteDialog";
import EditableCard from "components/EditableCard";
import BottomContainer from "components/FormBottom";
import Loader from "components/Loader";
import SimpleButton from "components/SimpleButton";
import Text from "components/Text";
import useAPIFetch from "hooks/useAPIFetch";
import useAction from "hooks/useAction";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CardI, DeckI } from "types/deck";
import { next, prev } from "util/array";

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
	const [, , deleteCardCall] = useAction("decks", deleteCardAction);
	const deck = decks.find((d: DeckI) => d.id === deckID);
	const cardIdx =
		deck?.cards.findIndex((card: CardI) => card.id === cardID) ?? 0;

	const [card, setCard] = useState({
		question: deck?.cards[cardIdx].question ?? "",
		answer: deck?.cards[cardIdx].answer ?? "",
	});

	const [buttonDisabled, setButtonDisabled] = useState(true);

	useEffect(() => {
		setCard({
			question: deck?.cards[cardIdx].question ?? "",
			answer: deck?.cards[cardIdx].answer ?? "",
		});
	}, [cardIdx, deck, decks]);

	useEffect(() => {
		setButtonDisabled(cardEq(card, deck?.cards[cardIdx]));
	}, [card]);

	const navigate = useNavigate();

	if (loading) return <Loader size="large" />;
	if (!deck) return <Navigate to="/404" />;

	const handlePrev = () => {
		const prevIdx = prev(deck.cards, cardIdx);
		const prevCardID = deck.cards[prevIdx].id;
		navigate(`/decks/${deckID}/cards/${prevCardID}`);
	};

	const handleNext = () => {
		const nextIdx = next(deck.cards, cardIdx);
		const nextCardID = deck.cards[nextIdx].id;
		navigate(`/decks/${deckID}/cards/${nextCardID}`);
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

	const handleDelete = () => {
		const nextIdx = next(deck.cards, cardIdx);
		const nextCardID = deck.cards[nextIdx].id;
		const navigateTo =
			deck.cards.length > 1
				? `/decks/${deckID}/cards/${nextCardID}`
				: `/decks/${deckID}`;

		deleteCardCall(deckID, cardID);
		navigate(navigateTo);
	};

	return (
		<EditableCard
			deck={deck}
			card={card}
			onSubmit={handleSubmit}
			onQuestionInput={handleQuestionInput}
			onAnswerInput={handleAnswerInput}
		>
			<div className={style.swipe_container}>
				<PrevIcon onClick={handlePrev} />
				<Text color="lightgrey">
					card {cardIdx + 1} of {deck.cards.length}
				</Text>
				<NextIcon onClick={handleNext} />
			</div>
			<BottomContainer>
				{editDeckError && <p className="error">{editDeckError}</p>}
				<DeleteDialog onDelete={handleDelete}>Delete this card</DeleteDialog>
				<Button disabled={buttonDisabled} loading={editDeckLoading}>
					Save card
				</Button>
				<SimpleButton to={`/decks/${deck.id}`}>Cancel</SimpleButton>
			</BottomContainer>
		</EditableCard>
	);
};

export default CardDetail;
