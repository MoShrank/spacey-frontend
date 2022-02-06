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

interface CreateCardI {
	question: string;
	answer: string;
	deckID: string;
}

export const createCard = async (card: CreateCardI): Promise<CardI> => {
	return (await API.POST(`decks/${card.deckID}/cards`, card)) as CardI;
};
