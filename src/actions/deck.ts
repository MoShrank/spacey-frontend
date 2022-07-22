import {
	addGeneratedCards,
	createCard,
	createDeck,
	deleteCard,
	deleteDeck as deleteDeckCall,
	fetchAvgRecallProbabilities,
	fetchDecks,
	fetchNotes,
	generateCards,
	updateCard,
	updateDeck,
	updateGeneratedCards,
} from "api/deck";
import { CardI, DeckI } from "types/deck";
import { NoteI } from "types/note";
import { isEmpty } from "util/editor";

export const createDeckAction = async (deck: DeckI) => {
	const { name } = deck;
	if (!name) throw Error("please fill in all required fields");

	try {
		const newDeck = await createDeck(deck);
		return (curState: Array<DeckI>) => {
			return { decks: [...curState, newDeck] };
		};
	} catch (e) {
		throw Error("please fill in all required fields");
	}
};

export const updateDeckAction = async (deck: DeckI) => {
	const { name } = deck;
	if (!name) throw Error("please fill in all required fields");
	try {
		await updateDeck(deck);
		return (curState: Array<DeckI>) => {
			const updatedDecks = curState.map(d =>
				d.id === deck.id ? { ...d, ...deck } : d,
			);
			return { decks: [...updatedDecks] };
		};
	} catch (e) {
		throw Error("please fill in all required fields");
	}
};

export const deleteDeck = async (id: string) => {
	try {
		await deleteDeckCall(id);
		return (curState: Array<DeckI>) => {
			return { decks: curState.filter((deck: DeckI) => deck.id !== id) };
		};
	} catch (e) {
		throw Error("Could not delete deck.");
	}
};

export const getDecksAction = async () => {
	try {
		const decks = await fetchDecks();

		const deckData = decks.map(deck => {
			return {
				deckID: deck.id,
				totalNoCards: deck.cards.length,
			};
		});

		const recallProbabilities = await fetchAvgRecallProbabilities(deckData);

		decks.forEach(
			deck => (deck.averageRecallProbability = recallProbabilities[deck.id]),
		);

		/*
		TODO: this should be implemented as soon as the backend is ready
		.sort(
			(a: DeckI, b: DeckI) => a.lastLearned.getTime() - b.lastLearned.getTime(),
		);
		*/

		return () => {
			return { decks: decks };
		};
	} catch (e) {
		throw e as Error;
	}
};

export const getDeckAction = async (id: string) => {
	try {
		const decks = await fetchDecks();

		return () => {
			return decks.find((deck: DeckI) => deck.id === id);
		};
	} catch (e) {
		throw e as Error;
	}
};

export const createCardAction = async (card: CardI) => {
	const { question, answer } = card;
	if (isEmpty(question) || isEmpty(answer))
		throw Error("please fill in all required fields");

	try {
		const newDeck = await createCard(card);
		return (curState: Array<DeckI>) => {
			const deck = curState.find(deck => deck.id === card.deckID);
			if (!deck) throw Error("deck not found");

			// might not work because state is still the same as it
			// only does a shallow compare
			deck.cards = [...deck.cards, newDeck];

			return { decks: [...curState] };
		};
	} catch (e) {
		throw Error((e as Error).message);
	}
};

export const updateCardAction = async (card: CardI) => {
	const { question, answer } = card;
	if (isEmpty(question) || isEmpty(answer))
		throw Error("please fill in all required fields");

	try {
		const newCard = await updateCard(card);
		return (curState: Array<DeckI>) => {
			const deck = curState.find(deck => deck.id === card.deckID);
			if (!deck) throw Error("deck not found");

			const newCards = deck.cards.map((card: CardI) =>
				card.id === newCard.id ? newCard : card,
			);
			deck.cards = [...newCards];

			return { decks: [...curState] };
		};
	} catch (e) {
		throw Error((e as Error).message);
	}
};

export const deleteCardAction = async (deckID: string, cardID: string) => {
	try {
		await deleteCard(deckID, cardID);
		return (curState: Array<DeckI>) => {
			const deck = curState.find(deck => deck.id === deckID);
			if (!deck) throw Error("deck not found");

			const newCards = deck.cards.filter((card: CardI) => card.id !== cardID);
			deck.cards = [...newCards];

			return { decks: [...curState] };
		};
	} catch (e) {
		throw Error((e as Error).message);
	}
};

export const generateCardsAction = async (deckID: string, noteText: string) => {
	if (!noteText) throw new Error("please fill in all required fields");

	const note = { ...(await generateCards(deckID, noteText)), cards: [] };

	return (curState: Record<string, NoteI>) => {
		const newNotes = { ...curState, [deckID]: note };
		return { notes: newNotes };
	};
};

export const getNotesAction = async () => {
	const notes = await fetchNotes();

	return () => {
		return { notes: notes };
	};
};

export const updateGeneratedCardsAction = async (
	noteID: string,
	deckID: string,
	cards: { question: string; answer: string }[],
	newCard: { question: string; answer: string; idx: number },
) => {
	let newCards: { question: string; answer: string }[] = [];

	if (newCard !== undefined) {
		const { question, answer } = newCard;
		if (!question || !answer) throw Error("please fill in all required fields");

		newCards = cards.map((c, idx) => {
			if (idx === newCard.idx) c = newCard;
			return c;
		});
	} else {
		newCards = cards;
	}

	await updateGeneratedCards(noteID, newCards);

	return (curState: Record<string, NoteI>) => {
		const oldNote = curState[deckID];

		const newNotes = { ...curState, [deckID]: { ...oldNote, cards: newCards } };
		return { notes: newNotes };
	};
};

export const addGeneratedCardsAction = async (
	noteID: string,
	deckID: string,
) => {
	const cards = (await addGeneratedCards(noteID, deckID)).cards;

	return (curState: Array<DeckI>) => {
		const deck = curState.find(deck => deck.id === deckID);
		if (!deck) throw Error("deck not found");

		deck.cards = [...deck.cards, ...cards];

		return { decks: [...curState] };
	};
};
