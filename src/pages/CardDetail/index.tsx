import { deleteCardAction, updateCardAction } from "actions/deck";
import Button from "components/Button";
import DeleteDialog from "components/DeleteDialog";
import EditableCard from "components/EditableCard";
import BottomContainer from "components/FormBottom";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import SimpleButton from "components/SimpleButton";
import Spacer from "components/Spacer";
import Swiper from "components/Swiper";
import useActionZ from "hooks/useAction";
import useStore from "hooks/useStore";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { CardI, DeckI } from "types/deck";
import { next, prev } from "util/array";

const cardEq = (
	a: { question: string; answer: string } | undefined,
	b: { question: string; answer: string } | undefined,
): boolean => {
	return a?.question === b?.question && a?.answer === b?.answer;
};

const CardDetail = () => {
	const { deckID, cardID } = useParams();
	const decks = useStore(state => state.decks);
	const [editDeckLoading, editDeckError, action] = useActionZ(
		state => state.decks,
		updateCardAction,
	);
	const [, , deleteCardCall] = useActionZ(
		state => state.decks,
		deleteCardAction,
	);
	const deck = decks.find((d: DeckI) => d.id === deckID);
	const cardIdx =
		deck?.cards.findIndex((card: CardI) => card.id === cardID) ?? 0;

	const [card, setCard] = useState({
		question: deck?.cards[cardIdx].question ?? "",
		answer: deck?.cards[cardIdx].answer ?? "",
		id: deck?.cards[cardIdx].id ?? "",
	});

	const [buttonDisabled, setButtonDisabled] = useState(true);

	useEffect(() => {
		setCard({
			question: deck?.cards[cardIdx].question ?? "",
			answer: deck?.cards[cardIdx].answer ?? "",
			id: deck?.cards[cardIdx].id ?? "",
		});
	}, [cardIdx, deck, decks]);

	useEffect(() => {
		setButtonDisabled(cardEq(card, deck?.cards[cardIdx]));
	}, [card]);

	const navigate = useNavigate();

	if (!deckID || !cardID || !deck) return <Navigate to="/404" />;

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

	const handleQuestionInput = (value: string) => {
		setCard({
			...card,
			question: value,
		});
	};

	const handleAnswerInput = (value: string) => {
		setCard({
			...card,
			answer: value,
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
		<Modal>
			<ModalLayout onClose={() => navigate(`/decks/${deck.id}`)}>
				<EditableCard
					deck={deck}
					card={card}
					onSubmit={handleSubmit}
					onQuestionInput={handleQuestionInput}
					onAnswerInput={handleAnswerInput}
				>
					<Spacer spacing={3} />
					<Swiper handleNext={handleNext} handlePrev={handlePrev}>
						card {cardIdx + 1} of {deck.cards.length}
					</Swiper>
					<Spacer spacing={3} />
					<BottomContainer>
						{editDeckError && <p className="error">{editDeckError}</p>}
						<DeleteDialog onDelete={handleDelete}>Delete this card</DeleteDialog>
						<Spacer spacing={3} />
						<Button disabled={buttonDisabled} loading={editDeckLoading}>
							Save Changes
						</Button>
						<SimpleButton as={Link} to={`/decks/${deck.id}`}>
							Cancel
						</SimpleButton>
					</BottomContainer>
				</EditableCard>
			</ModalLayout>
		</Modal>
	);
};

export default CardDetail;
