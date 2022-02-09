import {
	createCard,
	createDeck,
	deleteDeck as deleteDeckCall,
	fetchDecks,
	updateDeck,
} from "api/deck";
import { CardI, DeckI } from "types/deck";

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
		const newDeck = await updateDeck(deck);
		return (curState: Array<DeckI>) => {
			const filteredDecks = curState.filter(
				(deck: DeckI) => deck.id !== newDeck.id,
			);
			return [...filteredDecks, newDeck];
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
		throw Error("please fill in all required fields");
	}
};

export const getDecks = async () => {
	try {
		const decks = await fetchDecks();

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
