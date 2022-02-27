import {
	CardEventI,
	CardI,
	DeckI,
	LearningCardI,
	LearningSessionI,
} from "types/deck";
import { getTimeFormatted } from "util/time";

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

export const deleteCard = async (
	deckID: string,
	cardID: string,
): Promise<void> => {
	await API.DELETE(`decks/${deckID}/cards/${cardID}`);
};

export const getLearningCards = async (
	deckID: string,
	cardsIDs: Array<string>,
): Promise<Array<LearningCardI>> => {
	return (await API.GET("learning/events", [
		["deckID", deckID],
		...cardsIDs.map(id => ["ids", id]),
	])) as Array<LearningCardI>;
};

export const createCardEvent = async (cardEvent: CardEventI) => {
	return (await API.POST("learning/event", {
		...cardEvent,
		startedAt: getTimeFormatted(cardEvent.startedAt),
		finishedAt: getTimeFormatted(cardEvent.finishedAt),
	})) as CardEventI;
};

export const createLearningSession = async (deckID: string) => {
	return (await API.POST("learning/session", {
		deckID,
		startedAt: getTimeFormatted(),
	})) as LearningSessionI;
};

export const finishLearningSession = async (
	learningSession: LearningSessionI,
) => {
	return await API.PUT("learning/session", {
		...learningSession,
		finishedAt: getTimeFormatted(),
	});
};
