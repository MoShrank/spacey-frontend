import { updateGeneratedCardsAction } from "actions/deck";
import useAction from "hooks/useAction";
import { useState } from "react";
import { GeneratedCard, NoteI } from "types/note";
import { next, prev } from "util/array";

const getIsCardDifferent = (card1: GeneratedCard, card2: GeneratedCard) => {
	return card1.question !== card2.question || card1.answer !== card2.answer;
};

const empyCard: GeneratedCard = {
	question: "",
	answer: "",
	source_start_index: 0,
	source_end_index: 0,
};

const useGeneratedCards = (note: NoteI | null, deckID?: string | null) => {
	const [error, setError] = useState<string>("");

	const [selectedCard, setSelectedCard] = useState<GeneratedCard>(empyCard);
	const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);

	const isCardDifferent =
		note &&
		selectedCardIdx != null &&
		selectedCardIdx < note.cards.length &&
		getIsCardDifferent(selectedCard, note.cards[selectedCardIdx]);

	const [updateLoading, updateError, updateCards] = useAction(
		state => state.notes,
		updateGeneratedCardsAction,
	);

	const handleSelectCard = (idx: number) => {
		if (!note) {
			setError("No note found");
			return;
		}

		const card = note.cards[idx];

		setSelectedCard(card);
		setSelectedCardIdx(idx);
	};

	const handleEditCards = async () => {
		setError("");

		if (!note || !deckID) {
			setError("No note found");
			return;
		}

		if (selectedCardIdx == null) {
			setError("No card selected");
			return;
		}
		try {
			await updateCards(
				note.id,
				deckID,
				note.cards,
				selectedCardIdx,
				selectedCard,
			);
		} catch {
			return;
		}
		setSelectedCard(empyCard);
		setSelectedCardIdx(null);
	};

	const handleDeleteCard = async () => {
		setError("");

		if (!note || !deckID) {
			setError("No note found");
			return;
		}

		if (selectedCardIdx == null) {
			setError("No card selected");
			return;
		}
		try {
			await updateCards(note.id, deckID, note.cards, selectedCardIdx);
		} catch {
			return;
		}
		setSelectedCard(empyCard);
		setSelectedCardIdx(null);
	};

	const handleNextCard = () => {
		setError("");

		if (selectedCardIdx == null || !note) {
			setError("No card selected");
			return;
		}

		const nextIdx = next(note.cards, selectedCardIdx);
		setSelectedCard(note.cards[nextIdx]);
		setSelectedCardIdx(nextIdx);
	};

	const handlePrevCard = () => {
		setError("");

		if (selectedCardIdx == null || !note) {
			setError("No card selected");
			return;
		}

		const prevIdx = prev(note.cards, selectedCardIdx);
		setSelectedCard(note.cards[prevIdx]);
		setSelectedCardIdx(prevIdx);
	};

	const setQuestion = (question: string) => {
		if (!selectedCard) return;
		setSelectedCard({ ...selectedCard, question });
	};

	const setAnswer = (answer: string) => {
		if (!selectedCard) return;
		setSelectedCard({ ...selectedCard, answer });
	};

	return {
		selectedCard,
		setQuestion,
		setAnswer,
		selectedCardIdx,
		isCardDifferent,
		loading: updateLoading,
		error: error || updateError,
		handleSelectCard,
		handleEditCards,
		handleDeleteCard,
		handleNextCard,
		handlePrevCard,
	};
};

export default useGeneratedCards;
