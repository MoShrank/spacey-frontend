import { DeckI } from "types/deck";

import API from "./api";

export const getDecks = async (): Promise<Array<DeckI>> => {
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
