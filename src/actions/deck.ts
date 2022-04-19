import {
	createCard,
	createCardEvent,
	createDeck,
	createLearningSession,
	deleteCard,
	deleteDeck as deleteDeckCall,
	fetchAvgRecallProbabilities,
	fetchDecks,
	fetchNotes,
	finishLearningSession,
	generateCards,
	getLearningCards,
	updateCard,
	updateDeck,
} from "api/deck";
import { CardEventI, CardI, DeckI, LearningSessionI } from "types/deck";
import { NoteI } from "types/note";

export const createDeckAction = async (deck: DeckI) => {
	const { name } = deck;
	if (!name) throw Error("please fill in all required fields");

	try {
		const newDeck = await createDeck(deck);
		return (curState: Array<DeckI>) => {
			return [...curState, newDeck];
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
			return [...updatedDecks];
		};
	} catch (e) {
		throw Error("please fill in all required fields");
	}
};

export const deleteDeck = async (id: string) => {
	try {
		await deleteDeckCall(id);
		return (curState: Array<DeckI>) => {
			return curState.filter((deck: DeckI) => deck.id !== id);
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
			return decks;
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
	if (!question || !answer) throw Error("please fill in all required fields");

	try {
		const newDeck = await createCard(card);
		return (curState: Array<DeckI>) => {
			const deck = curState.find(deck => deck.id === card.deckID);
			if (!deck) throw Error("deck not found");

			// might not work because state is still the same as it
			// only does a shallow compare
			deck.cards = [...deck.cards, newDeck];

			return [...curState];
		};
	} catch (e) {
		throw Error((e as Error).message);
	}
};

export const updateCardAction = async (card: CardI) => {
	const { question, answer } = card;
	if (!question || !answer) throw Error("please fill in all required fields");

	try {
		const newCard = await updateCard(card);
		return (curState: Array<DeckI>) => {
			const deck = curState.find(deck => deck.id === card.deckID);
			if (!deck) throw Error("deck not found");

			const newCards = deck.cards.map((card: CardI) =>
				card.id === newCard.id ? newCard : card,
			);
			deck.cards = [...newCards];

			return [...curState];
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

			return [...curState];
		};
	} catch (e) {
		throw Error((e as Error).message);
	}
};

export const getLearningCardsAction = async (
	deckID: string,
	cardIDs: string[],
) => {
	try {
		const learningCards = await getLearningCards(deckID, cardIDs);
		return (curState: DeckI) => {
			return {
				...curState,
				learningOrder: learningCards,
				totalLearningCards: learningCards.length,
			};
		};
	} catch (e) {
		throw Error((e as Error).message);
	}
};

export const createLearningSessionAction = async (deckID: string) => {
	try {
		const learningSession = await createLearningSession(deckID);

		return () => {
			return learningSession;
		};
	} catch (e) {
		throw Error((e as Error).message);
	}
};

export const finishLearningSessionAction = async (
	learningSession: LearningSessionI,
) => {
	try {
		await finishLearningSession(learningSession);

		return () => {
			return undefined;
		};
	} catch (e) {
		throw Error((e as Error).message);
	}
};

export const answerCardAction = async (cardEvent: CardEventI) => {
	try {
		await createCardEvent(cardEvent);

		return (curState: DeckI) => {
			const curLearningCard = curState.learningOrder[0];
			let newCards = curState.learningOrder.slice(1);

			if (!cardEvent.correct) {
				newCards = [...newCards, curLearningCard];
			}

			return { ...curState, learningOrder: newCards };
		};
	} catch (e) {
		throw Error((e as Error).message);
	}
};

export const setRecallProbability = (deckID: string, probability: number) => {
	return (curState: Array<DeckI>) => {
		const newDecks = curState.map((deck: DeckI) => {
			if (deck.id === deckID) {
				deck.averageRecallProbability = probability;
			}
			return deck;
		});

		return [...newDecks];
	};
};

export const generateCardsAction = async (deckID: string, noteText: string) => {
	const note = await generateCards(deckID, noteText);

	return (curState: Record<string, NoteI>) => {
		const newNotes = { ...curState, [deckID]: note };
		return newNotes;
	};
};

export const getNotesAction = async () => {
	const notes = await fetchNotes();

	return () => {
		return notes;
	};
};
