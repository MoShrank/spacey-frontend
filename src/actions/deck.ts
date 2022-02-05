import { createDeck, fetchDecks } from "api/deck";
import { DeckI } from "types/deck";

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

export const getDecks = async () => {
	try {
		const decks = await fetchDecks();

		return () => {
			return decks;
		};
	} catch (e) {
		throw e as Error;
	}
};
