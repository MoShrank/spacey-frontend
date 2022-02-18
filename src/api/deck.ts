import { CardI, DeckI } from "types/deck";

import API from "./api";

export const fetchDecks = async (): Promise<Array<DeckI>> => {
	return (await API.GET("decks")) as Array<DeckI>;
};

interface CreateDeckI {
	name: string;
	description: string;
	color: string;
}

export const createDeck = async (deck: CreateDeckI): Promise<DeckI> => {
	return (await API.POST("decks", deck)) as DeckI;
};

export const updateDeck = async (deck: {
	id: string;
	name: string;
	description: string;
	color: string;
}): Promise<DeckI> => {
	return (await API.PUT(`decks/${deck.id}`, deck)) as DeckI;
};

export const deleteDeck = async (id: string): Promise<void> => {
	await API.DELETE(`decks/${id}`);
};

interface CreateCardI {
	question: string;
	answer: string;
	deckID: string;
}

export const createCard = async (card: CreateCardI): Promise<CardI> => {
	return (await API.POST(`decks/${card.deckID}/cards`, card)) as CardI;
};

export const updateCard = async (card: CardI): Promise<CardI> => {
	return (await API.PUT(`decks/${card.deckID}/cards/${card.id}`, card)) as CardI;
};
